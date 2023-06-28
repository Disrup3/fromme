import { createPublicClient, getContract, http } from "viem";
import { polygonMumbai } from "wagmi/chains"; 
import { nftFactoryContract, frommeMarketplaceContract } from "./contracts";

export const addresses = {
NFTFactory:
    (nftFactoryContract.address as `0x${string}`) || ("0x0" as `0x${string}`),
FrommeMarketplace:
    (frommeMarketplaceContract.address as `0x${string}`) || ("0x0" as `0x${string}`),
} as const;

export const client = createPublicClient({
    chain: polygonMumbai,
    // process.env.NEXT_PUBLIC_MODEDEPLOY == "production"
    // ? sepolia
    // : sepolia, // change this to deploy in production
    transport: http(),
});

export const NFTFactoryContract = getContract({
    address: addresses.NFTFactory,
    abi: nftFactoryContract.abi,
    publicClient: client,
});

export const FrommeMarketplace = getContract({
    address: addresses.FrommeMarketplace,
    abi: frommeMarketplaceContract.abi,
    publicClient: client,
});

export const NFTFactory_abi = NFTFactoryContract.abi;

export const FrommeMarketplace_abi = FrommeMarketplace.abi;