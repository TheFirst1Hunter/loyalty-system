/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Costumer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Costumer_phoneNumber_key" ON "Costumer"("phoneNumber");
