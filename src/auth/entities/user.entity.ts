import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  readonly id: string;
  username: string;
  UID: string;
  birthDate: Date;
  name: string;
  password: string;
  pin: number;
  serial: number;
}
