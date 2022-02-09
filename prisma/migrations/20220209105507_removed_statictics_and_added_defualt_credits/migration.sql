/*
  Warnings:

  - You are about to drop the `Statistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Costumer" ALTER COLUMN "credits" SET DEFAULT 0;

-- DropTable
DROP TABLE "Statistics";
