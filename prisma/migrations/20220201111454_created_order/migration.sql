/*
  Warnings:

  - You are about to drop the column `points` on the `Costumer` table. All the data in the column will be lost.
  - Added the required column `credits` to the `Costumer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Costumer" DROP COLUMN "points",
ADD COLUMN     "credits" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "items" TEXT[],
    "tableNumber" INTEGER NOT NULL,
    "UID" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creditUsed" INTEGER NOT NULL DEFAULT 0,
    "returnedCredits" INTEGER NOT NULL DEFAULT 0,
    "costumerId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
