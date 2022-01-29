import { User } from './entities/user.entity';

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
