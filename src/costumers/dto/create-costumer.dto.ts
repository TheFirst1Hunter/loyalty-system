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
  @IsInt()
  pin: number;
}
