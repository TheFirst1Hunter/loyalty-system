import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginResponse } from './user.types';
import { RegisterUserDto } from './dto/register-user.dto';
import { loginResponse, hashPassword } from './user.helper';
import { User } from './entities/user.entity';
import { prisma } from '../../prisma';

@Injectable()
export class UserService {
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

    const { password } = user;

    if (await compare(pass, password)) {
      return loginResponse(user, this.jwtService);
    }

    return null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const User = await prisma.user.findUnique({ where: { username } });
    return User;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
