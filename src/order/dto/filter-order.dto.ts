import { Type } from 'class-transformer';
import { IsInt, Allow, IsBoolean, IsOptional, IsUUID } from 'class-validator';
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

  @Allow()
  @Type(() => String)
  @IsUUID()
  @IsOptional()
  costumerId;

  // Search weather it's a costumerName or a UUID
  @Allow()
  @Type(() => String)
  @IsOptional()
  name;
}
