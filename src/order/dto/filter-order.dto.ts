import { Type } from 'class-transformer';
import { IsInt, Allow } from 'class-validator';
export class QueryOrderDto {
  @Allow()
  @Type(() => Number)
  @IsInt()
  skip = 0;

  @Allow()
  @Type(() => Number)
  @IsInt()
  take = 5;
}
