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
  // @Matches(
  //   /964s*(?:1|2[1345]|3[02367]|4[023]|5[03]|6|026]|0?7[3-9]d)s*d{3}s*d{3,4}\b/,
  //   { message: 'enter an international iraqi number' },
  // )
  @Transform(({ value, obj, key }) => {
    const iraqiInternationalCode = '+964';

    if (value.startsWith(iraqiInternationalCode)) {
      return value;
    }

    const newPhoneNumber = value.startsWith('0')
      ? value.replace('0', iraqiInternationalCode)
      : iraqiInternationalCode + value;

    return newPhoneNumber;
  })
  phoneNumber: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  credits: number;

  @ApiProperty()
  @IsString()
  address: string;
}
