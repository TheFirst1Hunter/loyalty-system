import { HttpException, HttpStatus } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, isNumberString } from 'class-validator';

export class QueryCostumerDto {
  @Transform(({ value, key, obj }) => {
    obj[key] = Number(value) || 0;
  })
  skip = 0;

  @Transform(({ value, key, obj }) => {
    obj[key] = Number(value) || 5;
  })
  take = 5;

  @Transform(({ value, key, obj }) => {
    obj[key] = Boolean(value) || false;
  })
  nearestBirthday = false;

  @Transform(({ value, key, obj }) => {
    obj[key] = new Date(value) || new Date();
  })
  dateMin: Date;

  @Transform(({ value, key, obj }) => {
    obj[key] = new Date(value) || new Date();
  })
  dateMax: Date;

  @IsString()
  @IsOptional()
  name: string;

  @Transform(({ value, key, obj }) => {
    if (isNumberString(value)) obj[key] = Number(value);
    else
      throw new HttpException('please enter a number', HttpStatus.BAD_REQUEST);
  })
  serial: number;
}
