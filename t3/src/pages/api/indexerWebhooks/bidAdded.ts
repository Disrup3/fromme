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
    currentAmount: number,
    currentBuyer: string,
  }

  const { tokenId, currentAmount, currentBuyer } = req.body as Body;

  try {
    await checkOfferExists(tokenId, currentAmount, currentBuyer);
    return res.status(200).json({message: "ok"});
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkOfferExists = async (tokenId: number, currentAmount: number, currentBuyer: string) => {
  const rows = await prisma.offer.findUnique({
    where: {
      tokenId_buyer: {
        tokenId: tokenId,
        buyer: currentBuyer, 
      }
    }
  });
  if(rows) {
    await prisma.offer.update({
      where: {
        tokenId_buyer: {
          tokenId: tokenId,
          buyer: currentBuyer,
        }
      },
      data: {
        amount: currentAmount,
        isCancelled: false,
      }
    });
  } else {
    await prisma.offer.create({
      data: {
        tokenId: tokenId,
        buyer: currentBuyer,
        amount: currentAmount,
        isCancelled: false,
      }
    });
  }
}