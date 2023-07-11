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
  const { tokenId, startingTime } = req.body;

  try {
    const foundRow: boolean = await checkNftExists(tokenId, startingTime);
    return foundRow
    ? res.status(200).json({message: "ok"})
    : res.status(412).json({message: "Nonexisting offer"});
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkNftExists = async (tokenId: number, startingTime: number) => {
  const listedNft = await prisma.listedNft.findUnique({
    where: {
        tokenId_startingTime: {
          tokenId, startingTime,
        },
    },
  })
  if (listedNft){
    await prisma.listedNft.update({
        where: {
            tokenId_startingTime: {
              tokenId, startingTime,
            },
        },
        data: {
          isCancelled: true,
        }
      })
  }
    
  return (listedNft ? true : false);
}