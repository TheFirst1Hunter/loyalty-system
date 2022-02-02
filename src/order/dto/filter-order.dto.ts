import { Type } from 'class-transformer';
import { IsInt, Allow, IsBoolean, IsOptional } from 'class-validator';
export class QueryOrderDto {
  @Allow()
  @Type(() => Number)
  @IsInt()
  skip = 0;

  @Allow()
  @Type(() => Number)
  @IsInt()
  take = 5;

  @Allow()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  discounted;
}
