import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

// import bcrypt from 'bcrypt';

export class RegisterUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  UID: string;

  @IsDate()
  @IsOptional()
  birthDate: Date;

  @IsString()
  name: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsInt()
  pin: number;
}
