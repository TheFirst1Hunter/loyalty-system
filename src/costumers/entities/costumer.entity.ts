import { Costumer as PrismaCostumer } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Costumer implements PrismaCostumer {
  readonly id: string;
  UID: string;
  birthDate: Date;
  name: string;
  @Exclude()
  pin: string;
  credits: number;
  serial: string;
  phoneNumber: string;
  active: boolean;
  isHisBirthday: boolean;
}
