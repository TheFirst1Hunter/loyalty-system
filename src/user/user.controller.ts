import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post('/login')
  login(@Body() body) {
    const { username, password } = body;

    const user = this.userService.validateUser(username, password);

    if (!user) {
      throw new Error('unable to login with the provided credentials');
    }

    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
