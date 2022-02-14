import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: false, example: 0 })
  @Allow()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  skip: number;

  @ApiProperty({ required: false, example: 5 })
  @Allow()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  take: number;

  @ApiProperty({ required: false, example: false })
  @Allow()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  nearestBirthday: boolean;

  @ApiProperty({ required: false, example: '2022-1-24' })
  @Allow()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dateMin: Date;

  @ApiProperty({ required: false, example: '2022-2-24' })
  @Allow()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dateMax: Date;

  @ApiProperty({ required: false, example: 'Hamza' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false, example: 10 })
  @Allow()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  serial: number;
}
