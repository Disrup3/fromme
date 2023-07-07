
import { addresses, NFTFactory_abi } from "../constants";
import { ethers } from 'ethers';
import dotenv from 'dotenv';


export default async function useReadOwnerOf(tokenId: number) {
  try {

    const providerUrl = process.env.NEXT_PUBLIC_URL_MUMBAI; // Replace with the actual JSON-RPC URL
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const contract = new ethers.Contract(addresses.NFTFactory, NFTFactory_abi, provider);

    // Call the `ownerOf` function to get the owner of a specific token
    const owner = await contract.ownerOf(tokenId);

    return owner;
  } catch (error) {
    console.error('Error reading owner of token:', error);
    throw error;
  }
}
