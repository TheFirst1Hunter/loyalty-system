/*
  Warnings:

  - You are about to drop the column `isSuperAdmin` on the `Costumer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Costumer" DROP COLUMN "isSuperAdmin";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false;
