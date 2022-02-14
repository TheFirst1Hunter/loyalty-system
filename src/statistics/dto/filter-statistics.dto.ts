import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QueryStatisticsDto {
  @ApiProperty({ required: true, example: '2022-2-1' })
  @IsString()
  from: Date;

  @ApiProperty({ required: true, example: '2022-3-3' })
  @IsString()
  to: Date;
}
