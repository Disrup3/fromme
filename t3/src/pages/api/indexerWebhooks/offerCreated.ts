import { prisma } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(!(req.method === "POST")) {
    return res.status(400).json({message: "unauthorized"});
  }

  const { tokenId, buyer, amount, startingTime, endTime } = req.body;

  console.log('+++++++++++++++++++')
  console.log(req.body)
  console.log(tokenId)
  console.log('+++++++++++++++++++')

  try {
    await checkOfferExists(tokenId, buyer, amount, startingTime, endTime);
    return res.status(200).json({message: "ok"})
  } catch (error) {
    return res.status(500).json({message: JSON.stringify(error)});
  }
}

const checkOfferExists = async (tokenId: number, buyer: string, amount: number, startingTime: number, endTime: number) => {

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