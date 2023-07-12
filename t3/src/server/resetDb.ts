import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function deleteAllNfts() {
    try {
        const deletedUsers = await prisma.nft.deleteMany();

        console.log('Deleted nfts:', deletedUsers);
    } catch (error) {
        console.log("error", error)
    }

}
  
// Usage
deleteAllNfts().catch((err) => console.log(err));