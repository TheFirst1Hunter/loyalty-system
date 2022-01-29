import { IsString, MinLength, MaxLength } from 'class-validator';

// import bcrypt from 'bcrypt';

export class RegisterUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  UID: string;

  @IsString()
  @MinLength(3)
  password: string;
}
