import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function deleteAllNfts() {
    const deletedUsers = await prisma.nft.deleteMany();

    console.log('Deleted nfts:', deletedUsers);
}
  
// Usage
deleteAllNfts();