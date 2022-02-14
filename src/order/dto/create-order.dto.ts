import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  costumerId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  UID: string;

  @ApiProperty()
  @IsNumber()
  tableNumber: number;

  @ApiProperty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  creditUsed?: number;

  @ApiProperty()
  @IsArray()
  items: string[];
}
