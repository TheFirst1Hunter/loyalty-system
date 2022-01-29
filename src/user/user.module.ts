import { Module } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SECRET_KEY } from '../utils/secrets';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [JwtModule.register({ secretOrPrivateKey: process.env.SECRET_KEY })],
})
export class UserModule {}
