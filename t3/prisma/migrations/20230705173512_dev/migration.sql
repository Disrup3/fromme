/*
  Warnings:

  - The primary key for the `ListedNft` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[tokenId,startingTime]` on the table `ListedNft` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ListedNft_tokenId_key";

-- AlterTable
ALTER TABLE "ListedNft" DROP CONSTRAINT "ListedNft_pkey",
ADD COLUMN     "isCancelled" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "seller" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "Auction" (
    "tokenId" INTEGER NOT NULL,
    "seller" TEXT,
    "startingAmount" BIGINT,
    "startingTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "isCancelled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Offer" (
    "tokenId" INTEGER NOT NULL,
    "buyer" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "isCancelled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Auction_tokenId_startingTime_key" ON "Auction"("tokenId", "startingTime");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_tokenId_buyer_key" ON "Offer"("tokenId", "buyer");

-- CreateIndex
CREATE UNIQUE INDEX "ListedNft_tokenId_startingTime_key" ON "ListedNft"("tokenId", "startingTime");

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Nft"("tokenId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Nft"("tokenId") ON DELETE CASCADE ON UPDATE CASCADE;
