import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  readonly id: string;
  username: string;
  UID: string;
  password: string;
}
