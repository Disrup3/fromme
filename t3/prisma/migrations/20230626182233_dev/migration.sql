/*
  Warnings:

  - You are about to drop the `Listedddd` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Listedddd";

-- CreateTable
CREATE TABLE "ListedNft" (
    "tokenId" INTEGER NOT NULL,
    "seller" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "startingTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,

    CONSTRAINT "ListedNft_pkey" PRIMARY KEY ("tokenId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ListedNft_tokenId_key" ON "ListedNft"("tokenId");
