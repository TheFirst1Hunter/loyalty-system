-- AlterTable
ALTER TABLE "Costumer" ALTER COLUMN "serial" DROP DEFAULT,
ALTER COLUMN "serial" SET DATA TYPE TEXT;
DROP SEQUENCE "Costumer_serial_seq";
