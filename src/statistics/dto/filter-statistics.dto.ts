import { IsString } from 'class-validator';

export class QueryStatisticsDto {
  @IsString()
  from: Date;

  @IsString()
  to: Date;
}
