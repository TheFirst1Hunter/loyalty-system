import { User } from './entities/user.entity';

export interface LoginResponse {
  user: User;
  tokens: { access: string; refresh: string };
}
