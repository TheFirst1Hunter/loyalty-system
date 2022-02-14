import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginResponse } from './auth.types';
import { loginResponse, hashPassword } from './auth.helper';
import { PrismaClient } from '@prisma/client';
import { globalProviders } from '../globals/global.types';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(globalProviders.prisma) private prisma: PrismaClient,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    registerUserDto.password = await hashPassword(registerUserDto.password);

    const user = await this.prisma.user.create({ data: registerUserDto });

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
    const user = await this.prisma.user.findUnique({ where: { username } });

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

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return loginResponse(user, this.jwtService);
  }
}
