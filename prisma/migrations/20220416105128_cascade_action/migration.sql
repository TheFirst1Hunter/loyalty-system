-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_costumerId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
