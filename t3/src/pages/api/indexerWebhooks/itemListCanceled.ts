import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler( 
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!(req.method === "POST")) {
    return res.status(400).json({message: "unauthorized"});
  }
  // Item List Canceled
  const { tokenId, seller} = req.body;

  try {
    await checkListingExists(tokenId, seller);
    return res.status(200).json({message: "ok"})
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkListingExists= async (tokenId: number, seller: string) => {
  const item = await prisma.Nft.findUnique({
    where: {
      tokenId: {tokenId}
    }
  });
  if(item) {
    await prisma.Nft.delete({
      where: {
        tokenId: {tokenId}
    }
    });
  }
}