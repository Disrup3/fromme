
import { addresses, NFTFactory_abi } from "../constants";
import { ethers } from 'ethers';


export default async function ReadOwnerOf(tokenId: number) {
  try {

    const providerUrl = process.env.NEXT_PUBLIC_URL_MUMBAI; // Replace with the actual JSON-RPC URL
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const contract = new ethers.Contract(addresses.NFTFactory, NFTFactory_abi, provider) as ethers.Contract & {ownerOf: (id: number) => Promise<string>};

    // Call the `ownerOf` function to get the owner of a specific token
    const owner = await contract.ownerOf(tokenId);

    return owner;
  } catch (error) {
    console.error('Error reading owner of token:', error);
    throw error;
  }
}
