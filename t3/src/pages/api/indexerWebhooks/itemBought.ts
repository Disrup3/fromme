import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler( 
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!(req.method === "POST")) {
    return res.status(400).json({message: "unauthorized"});
  }
  
  type Body = {
    tokenId: number,
    seller: string,
    buyer: string,
    amount: number,
  }
  
  const { tokenId, seller, buyer, amount } = req.body as Body;

  try {
    const foundRow: boolean = await checkNftExists(tokenId, seller, buyer, amount );
    return foundRow
    ? res.status(200).json({message: "ok"})
    : res.status(412).json({message: "Nonexisting offer"});
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkNftExists = async (tokenId: number, seller: string, buyer:string, amount: number) => {
  const listedNft = await prisma.listedNft.findFirst({
    where: {
      tokenId:tokenId,
      amount:amount,
    },
    include:{
      nft:true,
    }
  });
  if (listedNft){
    await prisma.listedNft.updateMany({
      where: {
        tokenId:tokenId,
      },
      data: {
        isCancelled: true,
      }
    })
  }
  return (listedNft ? true : false);
}