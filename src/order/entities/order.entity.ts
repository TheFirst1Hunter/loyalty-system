import { Order as PrismaOrder } from '@prisma/client';

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
