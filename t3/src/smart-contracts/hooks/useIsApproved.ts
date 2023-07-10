
import { addresses, NFTFactory_abi } from "../constants";
import { ethers } from 'ethers';
import dotenv from 'dotenv';


export default async function useIsApproved(tokenId: number) {
  try {

    const providerUrl = process.env.NEXT_PUBLIC_URL_MUMBAI; // Replace with the actual JSON-RPC URL
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const contract = new ethers.Contract(addresses.NFTFactory, NFTFactory_abi, provider);

    const addressApproved = await contract.getApproved(tokenId);

    return addressApproved;
  } catch (error) {
    console.error('Error reading getApproved of token:', error);
    throw error;
  }
}
