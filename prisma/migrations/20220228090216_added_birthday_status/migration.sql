/*
  Warnings:

  - You are about to drop the column `isHisBirthday` on the `Costumer` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BDstatus" AS ENUM ('today', 'tomorrow', 'nextMonth', 'nothing');

-- AlterTable
ALTER TABLE "Costumer" DROP COLUMN "isHisBirthday",
ADD COLUMN     "birthdayStatus" "BDstatus" NOT NULL DEFAULT E'nothing';
