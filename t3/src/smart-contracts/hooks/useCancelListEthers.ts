
import { addresses, FrommeMarketplace_abi } from "../constants";
import { ethers } from 'ethers';

// Load environment variables from .env file
// dotenv.config({ path: '..\..\..\.env' });

export default async function useCancelList(_tokenId: number) {
  try {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const contract = new ethers.Contract(addresses.FrommeMarketplace, FrommeMarketplace_abi, signer);

    async function sendTransactionToContract() {
      const tx = await contract.cancelList(_tokenId);
      await tx.wait(); // Wait for the transaction to be mined
      console.log('Transaction mined!');
    }

    sendTransactionToContract()

  } catch (error) {
    console.error('Error reading owner of token:', error);
    throw error;
  }
}
