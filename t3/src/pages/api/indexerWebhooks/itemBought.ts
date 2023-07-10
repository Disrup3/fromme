import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler( 
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!(req.method === "POST")) {
    return res.status(400).json({message: "unauthorized"});
  }
  // Item Listed  
  const { tokenId, seller, buyer, amount } = req.body;

  try {
    await checkNftExists(tokenId, seller, buyer, amount );
    return res.status(200).json({message: "ok"})
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkNftExists = async (tokenId: number, seller: string, buyer:string, amount: number) => {
  const var_listed = await prisma.listedNft.findFirst({
    where: {
      tokenId:tokenId,
      amount:amount,
    },
    include:{
      nft:true,
    }
  });
  await prisma.listedNft.update({
    where: {
      tokenId:var_listed!.nft.tokenId,
      amount:amount,
    },
    data: {
      isCancelled: true,
    }
  })
  await prisma.nft
}