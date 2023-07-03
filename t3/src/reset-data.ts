import { prisma } from "./server/db";


const resetData = async () => {
    await prisma.nft.deleteMany();
    await prisma.listedNft.deleteMany();
    
}

resetData().then(() => console.log("success")).catch((err) => console.log(err))