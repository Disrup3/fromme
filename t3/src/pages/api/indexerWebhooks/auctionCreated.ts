import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

interface EndpointParams {
  tokenId: number;
  seller: string;
  startingAmount: number;
  startingTime: number;
  endTime: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!(req.method === "POST")) {
    return res.status(400).json({message: "unauthorized"});
  }

  // tokenId, seller, startingAmount, startingTime, endTime
  const params = req.body as EndpointParams;

  try {
    await checkOfferExists(
      params.tokenId,
      params.seller,
      params.startingAmount,
      params.startingTime,
      params.endTime
    );
    return res.status(200).json({message: "ok"});
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkOfferExists = async (tokenId: number, seller: string, startingAmount: number, startingTime: number, endTime: number) => {
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