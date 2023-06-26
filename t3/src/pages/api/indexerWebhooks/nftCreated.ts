import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(!(req.method === "POST")) return res.status(400).json({message: "unauthorized"})

    // NFT Created  
    const {tokenId, creator, tokenUri, feeNumerator} = req.body

    try {
      await checkNftExistAndCreate(tokenId, creator, tokenUri, feeNumerator); 

      return res.status(200).json({message: "ok"})

    } catch (error) {
      console.log(error)
      return res.status(500).json({message: JSON.stringify(error)})
  
    }

  }

  const checkNftExistAndCreate = async (tokenId: number, creator: string, tokenUri: string, feeNumerator: number) => {
    const nft = await prisma.nft.findUnique({where: {tokenId: {tokenId}}});
  
    if(!nft) {
      await prisma.nft.create({
          data: {
              tokenId,
              creator,
              tokenUri,
              feeNumerator
          }
      })
  
      return tokenId;
    }
  
    return nft.tokenId

  }