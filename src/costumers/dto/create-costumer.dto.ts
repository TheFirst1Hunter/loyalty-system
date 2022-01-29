import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateCostumerDto {
  @IsString()
  UID: string;

  @IsDate()
  @IsOptional()
  birthDate: Date;

  @IsString()
  name: string;

  @MinLength(4)
  @MaxLength(8)
  @IsString()
  pin: string;

  // Iraqi and international numbers
  @MaxLength(16)
  @MinLength(10)
  @IsString()
  phoneNumber: string;

  @IsInt()
  points: number;
}
