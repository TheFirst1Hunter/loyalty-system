import {
  IsString,
  IsInt,
  IsOptional,
  MinLength,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateCostumerDto {
  @IsDateString()
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
  @IsOptional()
  credits: number;
}
