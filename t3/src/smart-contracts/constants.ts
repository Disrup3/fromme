import { createPublicClient, getContract, http } from "viem";
import { sepolia } from "wagmi/chains";
import { nftfactoryContract } from "./contracts";

export const addresses = {
NFTFactory:
    (nftfactoryContract.address as `0x${string}`) || ("0x0" as `0x${string}`)
} as const;

export const client = createPublicClient({
    chain: sepolia,
    // process.env.NEXT_PUBLIC_MODEDEPLOY == "production"
    // ? sepolia
    // : sepolia, // change this to deploy in production
    transport: http(),
});

export const NFTFactoryContract = getContract({
    address: addresses.NFTFactory,
    abi: nftfactoryContract.abi,
    publicClient: client,
});