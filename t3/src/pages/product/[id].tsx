import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { GetServerSideProps } from "next";
import { prisma } from "~/server/db";
import { getSession } from "next-auth/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { addresses } from "../../smart-contracts/constants";

import useReadOwnerOf from "../../smart-contracts/hooks/useReadOwnerOf";
import useIsApproved from "../../smart-contracts/hooks/useIsApproved";
import useListItem from "../../smart-contracts/hooks/useListItemEthers";
import useCancelList from "../../smart-contracts/hooks/useCancelListEthers";
import useApproveItem from "../../smart-contracts/hooks/useApproveItemEthers";
import useBuyItem from "../../smart-contracts/hooks/useBuyItem";
import axios from "axios";
import shortenAddress from "~/utils/shortenAddress";

type ListItemData = {
  amountList: number;
  durationList: number;
};

const NFTProduct = ({
  nftId,
  tokenUri,
  creatorAddress,
  creatorFee,
  creatorName,
  sellerAddress,
  sellerName,
  amount,
  isListed,
  isOwner,
  isApproved,
}: any) => {
  // console.log('tokenUri :: ', tokenUri)

  const [tokenImage, setTokenImage] = useState("");
  const [showFormList, setShowFormList] = useState(false);
  const [formDataList, setFormDataList] = useState<ListItemData>({
    amountList: 0,
    durationList: 0,
  });

  async function formatTokenUri(_tokenUri: string) {
    const formattedTokenUri = `https://ipfs.io/ipfs/${_tokenUri?.substring(
      7,
      200
    )}`;
    return formattedTokenUri;
  }

  useEffect(() => {
    const getTokenUri = async () => {
      const _formattedTokenUri = await formatTokenUri(tokenUri);
      const metadataIPFS = await axios.get(_formattedTokenUri);

      const image = metadataIPFS.data.image;
      const formattedImage = await formatTokenUri(image);

      setTokenImage(formattedImage);
    };
    getTokenUri();
  }, []);

  const handleListItem = () => {
    setShowFormList(true);
  };

  const handleListItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormDataList(formDataList);
    setShowFormList(false);

    // send data to contract
    await useListItem(
      nftId,
      formDataList.amountList,
      formDataList.durationList
    );

    console.log("Item Listed");
  };

  const handleCancelListSubmit = async (e: React.FormEvent) => {
    await useCancelList(nftId);
    console.log("List Canceled");
  };

  const handleApproveItem = async (e: React.FormEvent) => {
    await useApproveItem(nftId);
    console.log("Item Approved");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataList({ ...formDataList, [e.target.name]: e.target.value });
  };

  let ethValue;

  if (isListed) {
    ethValue = ethers.utils.formatEther(amount);
  }

  const decimalPlaces: number = 2;
  const creatorFeeInPerc: string = `${((creatorFee / 10000) * 100).toFixed(
    decimalPlaces
  )}%`;

  function handleBuyItem() {
    useBuyItem(nftId);
    return 1;
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
                <p className="mt-2 font-semibold">Creator Fee:</p>
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
                  <p className="mt-6 font-semibold">Seller Address:</p>
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
            <button
              className="w-full rounded-full bg-red-500 py-2 font-semibold text-base-100"
              onClick={handleCancelListSubmit}
            >
              Cancel Listing
            </button>
          )}
          {isListed == false && isOwner == true && isApproved == false && (
            <button
              className="w-full rounded-full bg-gray-500 py-2 font-semibold text-base-100"
              onClick={handleApproveItem}
            >
              Approve Item
            </button>
          )}
          {isListed == false && isOwner == true && isApproved == true && (
            <button
              className="w-full rounded-full bg-yellow-500 py-2 font-semibold text-base-100"
              onClick={handleListItem}
            >
              List Item
            </button>
          )}
          {showFormList && (
            <form onSubmit={handleListItemSubmit}>
              <input
                className="mr-2 mt-2 appearance-none rounded border border-gray-400 bg-white px-4 py-2 leading-tight focus:border-blue-500 focus:outline-none"
                type="number"
                name="amountList"
                placeholder="amount in ETH"
                value={formDataList.amountList}
                onChange={handleInputChange}
              />
              <input
                className="mt-2 appearance-none rounded border border-gray-400 bg-white px-4 py-2 leading-tight focus:border-blue-500 focus:outline-none"
                type="number"
                name="durationList"
                placeholder="duration in seconds"
                value={formDataList.durationList}
                onChange={handleInputChange}
              />
              <button
                className="mt-5 w-full rounded-full bg-gray-500 py-2 font-semibold text-base-100"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
          <div className="my-4 h-px bg-gray-500"></div>
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
      {/* <div className="h-[450px] w-1/3 rounded-lg bg-test bg-cover bg-center"> */}
      <div>
        <Image
          src={tokenImage}
          alt={tokenImage}
          width={250}
          height={250}
          className="object-cover duration-700 group-hover:scale-110"
        />
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

  const userAddress = session?.user.name;
  // console.log('userAddress', userAddress)

  // from the query data, get nftId
  // from nftId get everything else (nft creator, if is listed the seller, etc.)
  const nftId = parseInt(ctx.query.id as string);
  console.log("nftId:", nftId);

  const ownerOFNft = await useReadOwnerOf(nftId);
  console.log("ownerOFNft", ownerOFNft);

  const addressApproved = await useIsApproved(nftId);
  const isApproved = addresses.FrommeMarketplace == addressApproved;
  console.log("isApproved", isApproved);

  const isOwner = ownerOFNft == userAddress;
  console.log("isOwner", isOwner);

  if (!nftId && nftId != 0) {
    console.log("404");
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const nftData = await prisma.nft.findUnique({
    where: {
      tokenId: nftId,
    },
  });
  // console.log('nftData :', nftData);
  const creatorAddress = nftData?.creator;
  const creatorFee = nftData?.feeNumerator;
  const tokenUri = nftData?.tokenUri;

  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp as a BigInt

  const listedNftDataList = await prisma.listedNft.findMany({
    where: {
      tokenId: nftId,
      startingTime: {
        lte: currentTimestamp, // Check if startingTime is less than or equal to current time
      },
      endTime: {
        gte: currentTimestamp, // Check if endTime is greater than or equal to current time
      },
    },
  });
  // weshould only have one listed element active (between timestamps)
  const listedNftData = listedNftDataList[0];
  console.log("listedNftData :", listedNftData);

  const creatorData = await prisma.user.findUnique({
    where: {
      address: creatorAddress,
    },
  });
  // console.log('creatorData :', creatorData);

  // Is NFT listed?
  if (listedNftData) {
    const amount = Number(listedNftData?.amount);
    const currentTime = new Date();
    const currentTimestamp = currentTime.getTime();

    const sellerAddress = listedNftData?.seller;

    const sellerData = await prisma.user.findUnique({
      where: {
        address: sellerAddress || "failSellerAddress",
      },
    });
    // console.log('sellerData :', sellerData);

    // If the list is still active - *100 because miliseconds to seconds
    if (currentTimestamp < listedNftData.endTime * 1000) {
      return {
        props: {
          nftId: nftId,
          tokenUri: tokenUri,
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
          isApproved: isApproved,
        },
      };
    }
  }

  return {
    props: {
      nftId: nftId,
      tokenUri: tokenUri,
      creatorAddress: creatorAddress,
      creatorFee: creatorFee,
      creatorName: creatorData?.name,
      sellerAddress: null,
      sellerName: null,
      amount: null,
      startingTime: null,
      endTime: null,
      isListed: false,
      isOwner: isOwner,
      isApproved: isApproved,
    },
  };
};
