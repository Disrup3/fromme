import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { GetServerSideProps } from "next";
import { prisma } from "~/server/db";
import { getSession } from "next-auth/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { addresses } from "../../smart-contracts/constants";

import ReadOwnerOf from "../../smart-contracts/auxFunctions/ReadOwnerOf";
import IsApproved from "../../smart-contracts/auxFunctions/IsApproved";

import CancelList from "../../smart-contracts/auxFunctions/CancelListEthers";
import ApproveItem from "../../smart-contracts/auxFunctions/ApproveItemEthers";

import ListItem from "../../smart-contracts/auxFunctions/ListItemEthers";
import CreateOffer from "../../smart-contracts/auxFunctions/CreateOffer";
import axios from "axios";
import shortenAddress from "~/utils/shortenAddress";

interface MetadataIPFS {
  data: {
    image: string;
  }
}

type ItemData = {
  amountList: number;
  durationList: number;
};

type NFTProductProps = {
  nftId: number,
  userAddress: string,
  nftData: {
    creator: string,
    feeNumerator: number,
    tokenId: number,
    tokenUri: string
  },
  listedNftData: {
    amount: number,
    endTime: number,
    isCancelled: boolean,
    seller: string,
    startingTime: number,
    tokenId: number
  },
  creatorData: {
    address: string,
    email: string,
    emailVerified: boolean,
    id: string,
    image: string,
    name: string
  },
  sellerData: {
    address: string,
    email: string,
    emailVerified: boolean,
    id: string,
    image: string,
    name: string
  },
  offerData: {
    amount: number,
    buyer: string,
    isCancelled: boolean,
    tokenId: number
  },
  buyerData: {
    address: string,
    email: string,
    emailVerified: boolean,
    id: string,
    image: string,
    name: string
  }
};

const NFTProduct = ({ nftId, userAddress, nftData, listedNftData, creatorData, sellerData, offerData, buyerData } : NFTProductProps) => {

  const [showFormList, setShowFormList] = useState(false);
  const [formDataList, setFormDataList] = useState<ItemData>({
    amountList: 0,
    durationList: 0,
  });

  const [showOfferList, setShowOfferList] = useState(false);
  const [formDataOffer, setFormDataOffer] = useState<ItemData>({
    amountList: 0,
    durationList: 0,
  });

  // logic moved from the server side props:
  const [ownerOFNft, setOwnerOFNft] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [isOwner, setIsOwnerd] = useState(false);

  const [isListed, setIsListed] = useState(false);
  const [hasOffer, setHasOffer] = useState(false);

  const [creatorAddress, setCreatorAddress] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorImage, setCreatorImage] = useState("");
  const [creatorFee, setCreatorFee] = useState(0);
  // const [tokenUri, setTokenUri] = useState("");
  const [tokenImage, setTokenImage] = useState("");

  const [sellerAddress, setSellerAddress] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerImage, setSellerImage] = useState("");
  const [sellerAmount, setSellerAmount] = useState("");
  
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerImage, setBuyerImage] = useState("");
  const [buyerAmount, setBuyerAmount] = useState("");

  async function loadMainInfo() {

    setOwnerOFNft(await ReadOwnerOf(nftId))

    const addressApproved = await IsApproved(nftId); 
    setIsApproved(addresses.FrommeMarketplace == addressApproved)
    setIsOwnerd(ownerOFNft == userAddress)

    if(nftData) {  
      setCreatorAddress(nftData.creator)
      setCreatorFee(nftData.feeNumerator)


      // Image
      const _formattedTokenUri = formatTokenUri(nftData.tokenUri)
      const metadataIPFS: MetadataIPFS = await axios.get(_formattedTokenUri)
  
      const image = metadataIPFS.data.image
      const formattedImage = formatTokenUri(image)
  
      setTokenImage(formattedImage)
    }

    if(creatorData) {  
      setCreatorName(creatorData.name || "NoName")
      setCreatorImage(creatorData.image || "/images/test.jpg")
    }

    // Is NFT listed?
    if (listedNftData) {
      setIsListed(true)
      const amount = Number(listedNftData?.amount)
      const sellerAddress = listedNftData?.seller;

      if (sellerAddress) {
        if(sellerData) {
          setSellerAddress(sellerAddress)
          setSellerName(sellerData.name || "NoName")
          setSellerImage(sellerData.image || "/images/test.jpg")
          setSellerAmount(ethers.utils.formatEther(amount))
        }
      }
    }
    // Has offers?
    if (offerData) {
      setHasOffer(true)
      const amount = Number(offerData?.amount)
      const buyerAddress = offerData?.buyer;

      if (buyerAddress) {
        if(buyerData) {
          setBuyerAddress(buyerAddress)
          setBuyerName(buyerData.name || "NoName")
          setBuyerImage(buyerData.image || "/images/test.jpg")
          setBuyerAmount(ethers.utils.formatEther(amount))
        }
      }
    }
  }

  useEffect(() => {
    loadMainInfo().catch(console.error);
  }, [])

  //////////////////////////////////////////

  function formatTokenUri(_tokenUri: string) {
    const formattedTokenUri = `https://ipfs.io/ipfs/${_tokenUri?.substring(7,200)}`;
    return formattedTokenUri
  }

  const handleListItem = () => {
    setShowFormList(!showFormList);
  };

  const handleListItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormDataList(formDataList);
    setShowFormList(false);

    // send data to contract
    await ListItem(nftId, formDataList.amountList, formDataList.durationList)
  };

  const handleCreateOffer = () => {
    setShowOfferList(!showOfferList);

  };
  const handleCreateOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormDataOffer(formDataOffer);
    setShowOfferList(false);

    // send data to contract
    await CreateOffer(nftId, formDataOffer.amountList, formDataOffer.durationList)
  };

  const handleCancelListSubmit = async (e: React.FormEvent) => {
    await CancelList(nftId)
  };

  const handleApproveItem = async (e: React.FormEvent) => {
    await ApproveItem(nftId)
  };

  const handleInputChangeList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataList({ ...formDataList, [e.target.name]: e.target.value });
  };

  const handleInputChangeOffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataOffer({ ...formDataOffer, [e.target.name]: e.target.value });
  };

  const decimalPlaces = 2;
  const creatorFeeInPerc: string = (creatorFee / 10000 * 100).toFixed(decimalPlaces) + '%';
  
  // console.log('creatorImage', creatorImage)
  console.log('isListed', isListed)
  console.log('hasOffer', hasOffer)
  console.log('isOwner', isOwner)
  console.log('isApproved', isApproved)

  return (
    <div className="flex w-full justify-evenly p-6">
      <div className="flex w-1/3 flex-col gap-5">
        <div className="flex gap-5">
          <h2 className="text-3xl font-bold">Token # {nftId} : </h2>
          <p className="text-1xl pt-2 font-thin">{isApproved ? "Approved" : "Pending Approval"}</p>
        </div>
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
            <div className="flex flex-col gap-7 ">
              <div className="flex justify-start">
                <div className="flex flex-col items-center font-semibold">
                  <p className="text-xl text-gray-700 font-bold"> Creator </p>
                  <Image
                    src={creatorImage}
                    width={40}
                    height={40}
                    alt={``}
                    className="rounded-full"
                  />
                  <p className="text-base">{creatorName}</p>
                </div>
              </div>
            </div>
            <div className="border-l"></div>
            <div className="flex flex-col gap-7">
              <div className="flex flex-col items-start">
                <p className="font-semibold mt-1">Address:</p>
                <p className="ml-5">{shortenAddress(creatorAddress)}</p>
                <p className="font-semibold mt-1">Fee:</p>
                <p className="ml-5">{creatorFeeInPerc}</p>
              </div>
            </div>
          </div>

          {isListed && (
            <div className="flex gap-6 rounded-lg border p-6">
              <div className="flex flex-col gap-7 ">
                <div className="flex justify-start">
                  <div className="flex flex-col items-center font-semibold">
                    <p className="text-xl text-gray-700 font-bold"> List   </p>
                    <Image
                      src={sellerImage}
                      width={40}
                      height={40}
                      alt={``}
                      className="rounded-full"
                    />
                    <p className="text-base">{sellerName}</p>
                  </div>
                </div>
              </div>
              <div className="border-l"></div>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col items-start">
                <p className="mt-1 font-semibold">Seller Address:</p>
                  <p className="ml-5">{shortenAddress(sellerAddress)}</p>
                  <p className="font-semibold">Price:</p>
                  <p className="text-3xl font-bold">
                    {sellerAmount || null}
                    <span className="text-base"> ETH</span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {hasOffer && (
          <div className="flex gap-6 rounded-lg border p-6">
            <div className="flex flex-col gap-7 ">
              <div className="flex justify-start">
                <div className="flex flex-col items-center font-semibold">
                  <p className="text-xl text-gray-700 font-bold"> Offer  </p>
                  <Image
                    src={buyerImage}
                    width={40}
                    height={40}
                    alt={``}
                    className="rounded-full"
                  />
                  <p className="text-base">{buyerName}</p>
                </div>
              </div>
            </div>
            <div className="border-l"></div>
            <div className="flex flex-col gap-7">
              <div className="flex flex-col items-start">
                <p className="font-semibold mt-1">Buyer Address:</p>
                <p className="ml-5">{shortenAddress(buyerAddress)}</p>
                <p className="font-semibold">Price:</p>
                  <p className="text-3xl font-bold">
                    {buyerAmount || null}
                    <span className="text-base"> ETH</span>
                  </p>
              </div>
            </div>
          </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
          {isListed == true && isOwner == false && (
            <button className="w-full rounded-full bg-primary py-2 font-semibold text-base-100">
              Purchase: {sellerAmount} ETH
            </button>
          )}
          {isListed == true && isOwner == true && (
            <button
              className="w-full rounded-full bg-red-500 py-2 font-semibold text-base-100"
              onClick={() => handleCancelListSubmit}
            >
              Cancel Listing
            </button>
          )}
          {isListed == false && isOwner == true && isApproved == false && (
            <button
              className="w-full rounded-full bg-gray-500 py-2 font-semibold text-base-100"
              onClick={() => handleApproveItem}
            >
              Approve Item
            </button>
          )}
          {isListed == false && isOwner == true && isApproved == true && (
            <button className="w-full rounded-full bg-yellow-500 py-2 font-semibold text-base-100" onClick={handleListItem}>
              {showFormList ? "Close": "List Item"}
            </button>
          )}
          {showFormList && (
            <form onSubmit={() => handleListItemSubmit}> 
              <input
                className="mt-2 mr-2 appearance-none bg-white border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                type="number"
                name="amountList"
                placeholder="amount in ETH"
                value={formDataList.amountList}
                onChange={handleInputChangeList}
              />
              <input
                className="mt-2 appearance-none bg-white border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                type="number"
                name="durationList"
                placeholder="duration in seconds"
                value={formDataList.durationList}
                onChange={handleInputChangeList}
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
      </div>
      {/* <div className="h-[450px] w-1/3 rounded-lg bg-test bg-cover bg-center"> */}
      <div>
      {tokenImage && <Image
          src={tokenImage}
          alt={tokenImage}
          width={250}
          height={250}
          className="object-cover duration-700 group-hover:scale-110"
        />}
        <div className="relative -left-12 top-8 w-fit rounded-full bg-accent px-4 py-1 font-semibold text-base-100">
          Music
        </div>
      </div>
    </div>
  );
}

export default NFTProduct;


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const session = await getSession(ctx)
  const userAddress = session?.user.name

  // from the query data, get nftId
  // from nftId get everything else (nft creator, if is listed the seller, etc.)
  const nftId = parseInt(ctx.query.id as string);

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
  // console.log('nftData', nftData)

  function formatTokenUri(_tokenUri: string) {
    const formattedTokenUri = `https://ipfs.io/ipfs/${_tokenUri?.substring(7,200)}`;
    return formattedTokenUri
  }

  if (nftData) {
    // Image
    const _formattedTokenUri = formatTokenUri(nftData.tokenUri)
    // console.log('_formattedTokenUri', _formattedTokenUri)
    const metadataIPFS: MetadataIPFS = await axios.get(_formattedTokenUri)

    const image = metadataIPFS.data.image
    const tokenImage = formatTokenUri(image)
    // console.log('tokenImage', tokenImage) 

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
      }
    });
    const listedNftData = listedNftDataList[0]
    // console.log('listedNftData', listedNftData)
  
    const creatorData = await prisma.user.findUnique({
      where: {
        address: nftData.creator  
      }
    });
    // console.log(nftId, 'creatorData', creatorData)
  
    // LISTED + OFFER
    let listedNftDataOut
    let offerDataOut
    let sellerDataOut 
    let buyerDataOut

    // Is NFT listed?
    if (listedNftData) {

      const convertedNftData = {
        ...listedNftData,
        amount: Number(listedNftData.amount)
      };
      // console.log('convertedNftData', convertedNftData)

      const sellerAddress = convertedNftData?.seller;
      const sellerData = await prisma.user.findUnique({
        where: {
          address: sellerAddress || "failSellerAddress"
        }
      });

      listedNftDataOut = convertedNftData
      sellerDataOut = sellerData

    } else {
      listedNftDataOut = null
      sellerDataOut = null
    }

    // OFFERS
    const offerDataList = await prisma.offer.findMany({
      where: {
        tokenId: nftId,
      }
    });
    const offerData = offerDataList[0]
    // console.log('offerData', offerData)
    
    // Has offer?
    if (offerData) {

      const convertedNftData = {
        ...offerData,
        amount: Number(offerData.amount)
      };
      // console.log('convertedNftData', convertedNftData)

      const buyerAddress = convertedNftData?.buyer;
      const buyerData = await prisma.user.findUnique({
        where: {
          address: buyerAddress || "failBuyerAddress"
        }
      });

      offerDataOut = convertedNftData
      buyerDataOut = buyerData

    } else {
      offerDataOut = null
      buyerDataOut = null
    }


    return {
      props: {
        nftId: nftId,
        userAddress: userAddress,
        nftData: nftData,
        listedNftData: listedNftDataOut,
        creatorData: creatorData,
        sellerData: sellerDataOut,
        tokenImage: tokenImage,
        offerData: offerDataOut,
        buyerData: buyerDataOut
        },
      };  

  }
  return {
    props: {
      nftId: nftId,
      userAddress: userAddress,
      nftData: null,
      listedNftData: null,
      creatorData: null,
      sellerData: null,
      tokenImage: null,
      offerData: null,
      buyerData: null
    },
  }
}