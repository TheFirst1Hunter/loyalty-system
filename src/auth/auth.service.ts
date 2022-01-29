import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      const { password } = user;

      bcrypt.compare(pass, password);
    }
    return null;
  }
}
