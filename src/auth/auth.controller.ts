import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshToken } from './dto/refreshToken-user.dto';
import { ResponseShape } from '../utils';
import { isRefresh } from './auth.helper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const data = await this.authService.register(registerUserDto);

    return new ResponseShape(true, data);
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    const { username, password } = body;

    const user = await this.authService.validateUser(username, password);

    return new ResponseShape(true, user);
  }

  @Post('/refresh-token')
  async refresh(@Body() body: RefreshToken) {
    const { refreshToken } = body;

    const id = isRefresh(refreshToken);

    const data = await this.authService.getUserById(id);

    return new ResponseShape(true, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
