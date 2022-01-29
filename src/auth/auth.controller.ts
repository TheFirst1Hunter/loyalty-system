import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResponseShape } from '../utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto) {
    const data = this.authService.register(registerUserDto);

    return new ResponseShape(true, data);
  }

  @Post('/login')
  async login(@Body() body) {
    const { username, password } = body;

    const user = await this.authService.validateUser(username, password);

    return new ResponseShape(true, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
