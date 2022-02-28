import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  MinLength,
  MaxLength,
  Allow,
  isDate,
} from 'class-validator';

import { Type, Transform } from 'class-transformer';

export class CreateCostumerDto {
  // @IsString()
  // @Type(() => Date)
  @ApiProperty()
  @Allow()
  @Transform(({ value, obj, key }) => {
    const d = new Date(value);

    if (!isDate(d)) {
      throw new HttpException('wrong date format', HttpStatus.BAD_REQUEST);
    }

    return d;
  })
  birthDate: Date;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(8)
  @IsString()
  pin: string;

  // Iraqi and international numbers
  @ApiProperty()
  @MaxLength(16)
  @MinLength(10)
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  credits: number;

  @ApiProperty()
  @IsString()
  address: string;
}
