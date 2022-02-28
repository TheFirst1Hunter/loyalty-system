import { BDstatus, Costumer as PrismaCostumer } from '@prisma/client';

export class Costumer implements PrismaCostumer {
  readonly id: string;
  UID: string;
  birthDate: Date;
  name: string;
  pin: string;
  credits: number;
  serial: string;
  phoneNumber: string;
  active: boolean;
  address: string;
  birthdayStatus: BDstatus;
}
