import { JwtService } from '@nestjs/jwt';
import { hash, genSalt } from 'bcrypt';

import {
  SECRET_KEY,
  JWT_ACCESS_TOKEN_LIFETIME,
  JWT_REFRESH_TOKEN_LIFETIME,
} from '../utils/secrets';

import { LoginResponse } from './auth.types';

export const loginResponse = (user: any, jwtService: JwtService) => {
  const access = jwtService.sign(
    { id: user.id },
    {
      secret: SECRET_KEY,
      expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
      privateKey: SECRET_KEY,
    },
  );

  const refresh = jwtService.sign(
    { id: user.id },
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