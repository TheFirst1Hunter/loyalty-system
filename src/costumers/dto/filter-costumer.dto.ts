import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDate,
  IsBoolean,
  Allow,
  IsInt,
} from 'class-validator';

export class QueryCostumerDto {
  @Allow()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  skip = 0;

  @Allow()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  take = 5;

  @Allow()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  nearestBirthday = false;

  @Allow()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dateMin: Date;

  @Allow()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dateMax: Date;

  @IsString()
  @IsOptional()
  name: string;

  @Allow()
  @Type(() => Number)
  @IsInt()
  serial: number;
}
