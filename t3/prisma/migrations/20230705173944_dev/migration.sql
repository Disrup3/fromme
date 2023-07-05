-- AddForeignKey
ALTER TABLE "ListedNft" ADD CONSTRAINT "ListedNft_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Nft"("tokenId") ON DELETE RESTRICT ON UPDATE CASCADE;
