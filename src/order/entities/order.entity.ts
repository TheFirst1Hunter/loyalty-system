import { Order as PrismaOrder } from '@prisma/client';
import { Costumer } from '../../costumers/entities/costumer.entity';

export class Order implements PrismaOrder {
  id: string;
  UID: string;
  costumerId: string;
  creditUsed: number;
  date: Date;
  items: string[];
  returnedCredits: number;
  tableNumber: number;
  totalPrice: number;
  active: boolean;
}

export class OrderCostumer extends Order {
  costumerName: string;
  costumerSerial: string;
  costumer?: Partial<Costumer>;
}
