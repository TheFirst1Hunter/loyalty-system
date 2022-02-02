import { User } from './entities/user.entity';

export interface LoginResponse {
  user: User;
  tokens: { access: string; refresh: string };
}

type tokenType = 'ACCESS' | 'REFRESH';

export interface Token {
  id: string;
  type: tokenType;
}
