
import { addresses, NFTFactory_abi } from "../constants";
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

export default async function useApproveItem(tokenId: number) {
  try {

    const providerUrl = process.env.NEXT_PUBLIC_URL_MUMBAI;
    console.log('providerUrl', providerUrl)

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const contract = new ethers.Contract(addresses.NFTFactory, NFTFactory_abi, signer);

    async function callContractFunction() {
      try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
          throw new Error('MetaMask is not installed'); 
        }
    
        // Request access to the user's MetaMask accounts
        await window.ethereum.enable();
    
        // Perform the contract function call
        const result = await contract.approve(addresses.FrommeMarketplace, tokenId)
    
        // Process the result
        console.log('Contract function called:', result);
      } catch (error) {
        console.error('Error calling contract function:', error);
      }
    }

    callContractFunction()
    
    //// OLD VERSION
    // Create a wallet instance using a private key
    // const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

    // let wallet: ethers.Wallet | undefined;
    // if (privateKey) {
    //   wallet = new ethers.Wallet(privateKey, provider);
    // }
    // const connectedContract = wallet ? contract.connect(wallet) : contract;

    // async function sendTransactionToContract() {
    //   if (!wallet) {
    //     console.error('Private key is missing');
    //     return;
    //   }

    //   const tx = await connectedContract.approve(addresses.FrommeMarketplace, tokenId);
    //   await tx.wait(); // Wait for the transaction to be mined
    //   console.log('Transaction mined! Nft approved');
    // }

    // sendTransactionToContract()

  } catch (error) {
    console.error('Error reading getApproved of token:', error);
    throw error;
  }
}
