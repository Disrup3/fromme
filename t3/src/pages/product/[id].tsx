import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { GetServerSideProps } from "next";
import { prisma } from "~/server/db";
import { getSession } from "next-auth/react";
import { ethers } from 'ethers';
import { useState } from "react";

import useReadOwnerOf from "../../smart-contracts/hooks/useReadOwnerOf";
import useListItem from "../../smart-contracts/hooks/useListItemEthers";
import useBuyItem from "../../smart-contracts/hooks/useBuyItem";


type ListItemData = {
  amountList: number;
  durationList: number;
};

const NFTProduct = ({ nftId, creatorAddress, creatorFee, creatorName, sellerAddress, sellerName
  , amount, startingTime, endTime, isListed, isOwner } : any) => {

  const [showFormList, setShowFormList] = useState(false);
  const [formDataList, setFormDataList] = useState<ListItemData>({
    amountList: 0,
    durationList: 0,
  });

  const handleListItem = () => {
    setShowFormList(true);
  };

  const handleListItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Do something with the form data
    console.log(formDataList);
    // Reset the form
    setFormDataList(formDataList);
    // Hide the form
    setShowFormList(false);

    // send data to contract
    await useListItem(nftId, formDataList.amountList, formDataList.durationList)

    console.log('Item Listed')
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataList({ ...formDataList, [e.target.name]: e.target.value });
  };
  
  // console.log('isListed :::::::', isListed)
  // console.log('isOwner :::::::', isOwner)

  let ethValue;

  if (isListed) {
    ethValue = ethers.utils.formatEther(amount);
  }

  function shortenAddress(address: string): string {
    if (address.length < 10) {
      throw new Error('Invalid Ethereum address');
    }
  
    const firstChars = address.slice(0, 6);
    const lastChars = address.slice(-4);
    return `${firstChars}...${lastChars}`;
  }

  const decimalPlaces: number = 2;
  const creatorFeeInPerc: string = `${(creatorFee / 10000 * 100).toFixed(decimalPlaces)}%`;
  
  function handleBuyItem() {
    useBuyItem(nftId)
    return 1
  }


  return (
    <div className="flex w-full justify-evenly p-6">
      <div className="flex w-1/3 flex-col gap-5">
        <h2 className="text-3xl font-bold">Token # {nftId}</h2>
        <hr />
        <div className="flex items-center justify-between">
          <div className="flex gap-4 font-semibold text-gray-400">
            <p>Views: {4}</p>
            <p>Sell: {0} Times</p>
          </div>
          <div className="flex items-center gap-1 font-bold">
            <AiOutlineHeart className="text-accent" />0
          </div>
        </div>
        <div>
          <div className="flex gap-6 rounded-lg border p-6">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col items-start">
                <p className="font-semibold">Creator Address:</p>
                <p className="ml-5">{shortenAddress(creatorAddress)}</p>
                <p className="font-semibold mt-2">Creator Fee:</p>
                <p className="ml-5">{creatorFeeInPerc}</p>
              </div>
            </div>
            <div className="border-l"></div>
            <div className="flex flex-col gap-7 ">
              <div className="flex justify-start">
                <div className="flex flex-col items-center font-semibold">
                  <p className="text-sm text-gray-400">Creator</p>
                  <div className="h-12 w-12 rounded-full bg-orange-400"></div>
                  <p className="text-base">{creatorName}</p>
                </div>
              </div>
            </div>
          </div>
          {isListed && (
            <div className="flex gap-6 rounded-lg border p-6">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col items-start">
                <p className="font-semibold mt-6">Seller Address:</p>
                  <p className="ml-5">{shortenAddress(sellerAddress)}</p>
                  <p className="font-semibold">Price</p>
                  <p className="text-3xl font-bold">
                    {ethValue || null}
                    <span className="text-base"> ETH</span>
                  </p>
                </div>
              </div>
              <div className="border-l"></div>
              <div className="flex flex-col gap-7">
                <div className="flex justify-start">
                  <div className="flex flex-col items-center font-semibold">
                    <p className="text-sm text-gray-400">Seller</p>
                    <div className="h-12 w-12 rounded-full bg-orange-400"></div>
                    <p className="text-base">{sellerName}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
          {isListed == true && isOwner == false && (
            <button className="w-full rounded-full bg-primary py-2 font-semibold text-base-100">
              Purchase: {ethValue} ETH
            </button>
          )}
          {isListed == true && isOwner == true && (
            <button className="w-full rounded-full bg-red-500 py-2 font-semibold text-base-100">
              Cancel Listing
            </button>
          )}
          {isListed == false && isOwner == true && (
            <button className="w-full rounded-full bg-yellow-500 py-2 font-semibold text-base-100" onClick={handleListItem}>
              List Item
            </button>
          )}
          {showFormList && (
            <form onSubmit={handleListItemSubmit}>
              <input
                className="mt-2 mr-2 appearance-none bg-white border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                type="number"
                name="amountList"
                placeholder="amount in ETH"
                value={formDataList.amountList}
                onChange={handleInputChange}
              />
              <input
                className="mt-2 appearance-none bg-white border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                type="number"
                name="durationList"
                placeholder="duration in seconds"
                value={formDataList.durationList}
                onChange={handleInputChange}
              />
              <button className="w-full rounded-full bg-gray-500 py-2 font-semibold text-base-100 mt-5" type="submit">Submit</button>
            </form>
          )}
          <div className="bg-gray-500 h-px my-4"></div>
          <p className="font-semibold text-gray-400">
            Transfer History{" "}
            <Link href={"#"} className="text-secondary">
              Click Here
            </Link>
          </p>
        </div>

        {/* <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
          <button className="w-full rounded-full bg-primary py-2 font-semibold text-base-100">
            Purchase
          </button>
          <p className="font-semibold text-gray-400">
            Transfer History{" "}
            <Link href={"#"} className="text-secondary">
              Click Here
            </Link>
          </p>
        </div> */}
      </div>
      <div className="h-[450px] w-1/3 rounded-lg bg-test bg-cover bg-center">
        <div className="relative -left-12 top-8 w-fit rounded-full bg-accent px-4 py-1 font-semibold text-base-100">
          Music
        </div>
      </div>
    </div>
  );
};

export default NFTProduct;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const session = await getSession(ctx);
  // console.log('session', session)

  const userAddress = session?.user.name
  // console.log('userAddress', userAddress)

  // from the query data, get nftId
  // from nftId get everything else (nft creator, if is listed the seller, etc.)
  const nftId = parseInt(ctx.query.id as string);
  console.log('nftId:', nftId)

  const ownerOFNft = await useReadOwnerOf(nftId); 
  console.log('ownerOFNft', ownerOFNft);

  const isOwner = (ownerOFNft == userAddress)

  if (!nftId && nftId != 0) {
    console.log("404")
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const nftData = await prisma.nft.findUnique({
    where: {
      tokenId: nftId
    }
  });
  // console.log('nftData :', nftData);
  const creatorAddress = nftData?.creator;
  const creatorFee = nftData?.feeNumerator;

  const listedNftData = await prisma.listedNft.findUnique({
    where: {
      tokenId: nftId 
    }
  });
  // console.log('listedNftData :', listedNftData);

  const creatorData = await prisma.user.findUnique({
    where: {
      address: creatorAddress 
    }
  });
  // console.log('creatorData :', creatorData);

  // Is NFT listed?
  if (listedNftData) {
    const amount = Number(listedNftData?.amount)
    const currentTime = new Date();
    const currentTimestamp = currentTime.getTime();

    const sellerAddress = listedNftData?.seller;
    
    const sellerData = await prisma.user.findUnique({
      where: {
        address: sellerAddress || "failSellerAddress"
      }
    });
    // console.log('sellerData :', sellerData);

    // If the list is still active - *100 because miliseconds to seconds
    if (currentTimestamp < listedNftData.endTime * 1000) {
      return {
        props: {
          nftId: nftId,
          creatorAddress: creatorAddress,
          creatorFee: creatorFee,
          creatorName: creatorData?.name,
          sellerAddress: sellerAddress,
          sellerName: sellerData?.name,
          amount: amount,
          startingTime: listedNftData?.startingTime,
          endTime: listedNftData?.endTime,
          isListed: true,
          isOwner: isOwner,
        },
      };  
    }
  } 

  return {
    props: {
      nftId: nftId,
      creatorAddress: creatorAddress,
      creatorFee: creatorFee,
      creatorName: creatorData?.name,
      sellerAddress: null,
      sellerName: null,
      amount: null,
      startingTime: null,
      endTime: null,
      isListed: false,
      isOwner: isOwner
    },
  };  

};



