import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwt from 'jsonwebtoken';
import { hash, genSalt } from 'bcrypt';
import { Token } from './auth.types';

import {
  SECRET_KEY,
  JWT_ACCESS_TOKEN_LIFETIME,
  JWT_REFRESH_TOKEN_LIFETIME,
} from '../utils/secrets';

import { LoginResponse } from './auth.types';

export const loginResponse = (user: any, jwtService: JwtService) => {
  const access = jwtService.sign(
    { id: user.id, type: 'ACCESS' },
    {
      secret: SECRET_KEY,
      expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
      privateKey: SECRET_KEY,
    },
  );

  const refresh = jwtService.sign(
    { id: user.id, type: 'REFRESH' },
    {
      secret: SECRET_KEY,
      expiresIn: JWT_REFRESH_TOKEN_LIFETIME,
      privateKey: SECRET_KEY,
    },
  );

  const obj: LoginResponse = {
    user,
    tokens: { access, refresh },
  };

  return obj;
};

export const hashPassword = async (text: string) => {
  const salt = await genSalt(12);
  return await hash(text, salt);
};

export const isRefresh = (token: string): string => {
  try {
    const payload: Token = jwt.verify(token, process.env.SECRET_KEY) as Token;
    if (payload && payload.type != 'REFRESH') {
      throw new HttpException(
        'this token is not a refresh token',
        HttpStatus.BAD_REQUEST,
      );
    }

    return payload.id;
  } catch (error) {
    throw new HttpException('invalid refresh token', HttpStatus.BAD_REQUEST);
  }
};
