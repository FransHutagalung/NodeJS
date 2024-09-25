-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "billingId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "shippingId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Addres" (
    "id" SERIAL NOT NULL,
    "lineOne" TEXT NOT NULL,
    "lineTwo" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Addres_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Addres" ADD CONSTRAINT "Addres_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
