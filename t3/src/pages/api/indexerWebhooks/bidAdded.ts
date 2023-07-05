import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!(req.method === "POST")) {
    return res.status(400).json({message: "unauthorized"});
  }

  const { tokenId, currentAmount, currentBuyer } = req.body;

  try {
    await checkOfferExists(tokenId, currentAmount, currentBuyer);
    return res.status(200).json({message: "ok"});
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

// ESTA A MEDIO HACER TODAVIA

const checkOfferExists = async (tokenId: number, currentAmount: number, currentBuyer: string) => {
  const rows = await prisma.offer.findMany({
    where: {
      tokenId_startingTime: {
        tokenId, startingTime,
      }
    }
  });
  if(rows) {
    await prisma.auction.update({
      where: {
        tokenId_startingTime: {
          tokenId, startingTime,
        }
      },
      data: {
        seller: seller,
        startingTime: startingTime,
        startingAmount: startingAmount,
        endTime: endTime,
      }
    });
  } else {
    await prisma.auction.create({
      data: {
        tokenId: tokenId,
        seller: seller,
        startingTime: startingTime,
        startingAmount: startingAmount,
        endTime: endTime,
      }
    });
  }
}