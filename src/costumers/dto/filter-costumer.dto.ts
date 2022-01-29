import { Transform, Type } from 'class-transformer';

export class QueryCostumerDto {
  @Type(() => Number)
  @Transform(({ value, key, obj }) => {
    obj[key] = Number(value) || 0;
  })
  skip = 0;

  @Type(() => Number)
  @Transform(({ value, key, obj }) => {
    obj[key] = Number(value) || 5;
  })
  take = 5;
}
