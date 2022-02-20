import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Allow, IsBoolean, IsOptional, IsUUID } from 'class-validator';
export class QueryOrderDto {
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
  discounted: boolean;

  @ApiProperty({
    required: false,
    example: '0083d1ea-a07b-4a3c-a6ef-1bb6200612a0',
  })
  @Allow()
  @Type(() => String)
  @IsUUID()
  @IsOptional()
  costumerId: string;

  // Search weather it's a costumerName or a UUID
  @ApiProperty({ required: false, example: 'Hamza' })
  @Allow()
  @Type(() => String)
  @IsOptional()
  name: string;
}
