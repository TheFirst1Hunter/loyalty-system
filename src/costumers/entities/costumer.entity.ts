import { Costumer as PrismaCostumer } from '@prisma/client';

export class Costumer implements PrismaCostumer {
  readonly id: string;
  UID: string;
  birthDate: Date;
  name: string;
  pin: number;
  points: number;
  serial: number;
}
