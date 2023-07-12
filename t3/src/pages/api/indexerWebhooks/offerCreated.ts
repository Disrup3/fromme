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
    buyer: string,
    amount: number,
  }

  const { tokenId, buyer, amount } = req.body as Body;

  try {
    await checkOfferExists(tokenId, buyer, amount);
    return res.status(200).json({message: "ok"})
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkOfferExists = async (tokenId: number, buyer: string, amount: number) => {
  const row = await prisma.offer.findUnique({
    where: {
      tokenId_buyer: {
        tokenId, buyer,
      }
    }
  });
  if(row) {
    await prisma.offer.update({
      where: {
        tokenId_buyer: {
          tokenId, buyer,
        }
      },
      data: {
        buyer,
        amount,
        isCancelled: false,
      }
    });
  } else {
    await prisma.offer.create({
      data: {
        tokenId,
        buyer,
        amount,
        isCancelled: false,
      }
    });
  }
}