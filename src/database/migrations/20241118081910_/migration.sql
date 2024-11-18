-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('NOT_VALIDATED', 'VALIDATED', 'DELETED', 'BANNED', 'TERMINATED');

-- CreateEnum
CREATE TYPE "walletType" AS ENUM ('DEPOSIT', 'WITHDRAW');

-- CreateEnum
CREATE TYPE "productStatus" AS ENUM ('STOP_SELL', 'SOLD_OUT', 'FOR_SALE');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "full_name" TEXT,
    "phone" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT true,
    "expiresIn" TIMESTAMP(5) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" UUID NOT NULL,
    "type" "walletType" NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "invoice_number" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
