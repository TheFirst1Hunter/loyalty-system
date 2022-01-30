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

  @Type(() => Boolean)
  @Transform(({ value, key, obj }) => {
    obj[key] = Boolean(value) || false;
  })
  nearestBirthday = false;

  @Type(() => Date)
  @Transform(({ value, key, obj }) => {
    obj[key] = new Date(value) || new Date();
  })
  dateMin: Date;

  @Type(() => Date)
  @Transform(({ value, key, obj }) => {
    obj[key] = new Date(value) || new Date();
  })
  dateMax: Date;
}
