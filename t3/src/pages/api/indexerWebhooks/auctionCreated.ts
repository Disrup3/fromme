import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!(req.method === "POST")) {
    return res.status(400).json({message: "unauthorized"});
  }

  const { tokenId, seller, startingAmount, startingTime, endTime } = req.body;

  try {
    await checkAuctionExists(tokenId, seller, startingAmount, startingTime, endTime);
    return res.status(200).json({message: "ok"});
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkAuctionExists = async (tokenId: number, seller: string, startingAmount: number, startingTime: number, endTime: number) => {
  const row = await prisma.auction.findUnique({
    where: {
      tokenId_startingTime: {
        tokenId, startingTime,
      }
    }
  });
  if(row) {
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