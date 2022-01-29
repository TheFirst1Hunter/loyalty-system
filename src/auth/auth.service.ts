import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginResponse } from './auth.types';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { loginResponse, hashPassword } from './auth.helper';
import { User } from '../auth/entities/user.entity';
import { prisma } from '../../prisma';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    registerUserDto.password = await hashPassword(registerUserDto.password);

    const user = await prisma.user.create({ data: registerUserDto });

    return loginResponse(user, this.jwtService);
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<LoginResponse | null> {
    const user = await this.findByUsername(username);

    if (!user) {
      throw new HttpException(
        'unable to login with the provided credential',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password } = user;

    if (await compare(pass, password)) {
      return loginResponse(user, this.jwtService);
    }

    return null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user)
      throw new HttpException(
        'no user has this username',
        HttpStatus.BAD_REQUEST,
      );

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
