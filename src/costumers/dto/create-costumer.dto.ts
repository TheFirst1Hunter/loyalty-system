import { HttpException, HttpStatus } from '@nestjs/common';
import {
  IsString,
  IsInt,
  IsOptional,
  MinLength,
  MaxLength,
  Allow,
  isDate
} from 'class-validator';

import { Type, Transform } from 'class-transformer';

export class CreateCostumerDto {
  // @IsString()
  // @Type(() => Date)
  @Allow()
  @Transform(({ value, obj, key }) => {
    const d = new Date(value);

    if (!isDate(d)) {
      throw new HttpException('wrong date format', HttpStatus.BAD_REQUEST);
    }

    return d;
  })
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
