import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!(req.method === "POST")) {
    return res.status(400).json({message: "unauthorized"});
  }

  const { tokenId, seller, buyer, amount } = req.body;

  try {
    const foundRow: boolean = await checkOfferExists(tokenId, seller, buyer, amount);
    return foundRow
    ? res.status(200).json({message: "ok"})
    : res.status(412).json({message: "Nonexisting offer"});
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkOfferExists = async (tokenId: number, seller: string, buyer: string, amount: number): Promise<boolean> => {
  const row = await prisma.offer.findUnique({
    where: {
      tokenId_buyer: {
        tokenId, buyer,
      }
    }
  });
  if(row) {
    await prisma.offer.delete({
      where: {
        tokenId_buyer: {
          tokenId, buyer,
        }
      },
    });
  }
  return (row ? true : false);
}