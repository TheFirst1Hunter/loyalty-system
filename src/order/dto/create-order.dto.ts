import {
  IsString,
  IsUUID,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsUUID()
  costumerId: string;

  @IsString()
  UID: string;

  @IsNumber()
  tableNumber: number;

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  @IsOptional()
  creditUsed? = 0;

  @IsArray()
  items: string[];
}
