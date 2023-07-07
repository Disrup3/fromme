
import { addresses, FrommeMarketplace_abi } from "../constants";
import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load environment variables from .env file
// dotenv.config({ path: '..\..\..\.env' });

export default async function useListItem(_tokenId: number, _amount: number, _durationInSeconds: number) {
  try {

    const providerUrl = process.env.NEXT_PUBLIC_URL_MUMBAI;
    console.log('providerUrl', providerUrl)
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const contract = new ethers.Contract(addresses.FrommeMarketplace, FrommeMarketplace_abi, provider);

    // Create a wallet instance using a private key
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    console.log('privateKey', privateKey)

    let wallet: ethers.Wallet | undefined;
    if (privateKey) {
      wallet = new ethers.Wallet(privateKey, provider);
    }
    const connectedContract = wallet ? contract.connect(wallet) : contract;

    // Example function to send a transaction to the contract
    async function sendTransactionToContract() {
      if (!wallet) {
        console.error('Private key is missing');
        return;
      }

      const amountInWei = ethers.utils.parseEther(_amount.toString());
      // console.log(amountInWei)

      const tx = await connectedContract.listItem(_tokenId, amountInWei, _durationInSeconds);
      await tx.wait(); // Wait for the transaction to be mined
      console.log('Transaction mined!');
    }

    sendTransactionToContract()

  } catch (error) {
    console.error('Error reading owner of token:', error);
    throw error;
  }
}
