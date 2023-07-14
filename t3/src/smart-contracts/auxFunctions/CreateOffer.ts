
import { addresses, FrommeMarketplace_abi } from "../constants";
import { ethers } from 'ethers';

export default async function CreateOffer(_tokenId: number, _amount: number, _durationInSeconds: number) {
  try {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const contract = new ethers.Contract(addresses.FrommeMarketplace, FrommeMarketplace_abi, signer)  as ethers.Contract & { createOffer: (_tokenId: number, _durationInSeconds: number, value: {value: number}) => Promise<void> }

    // Example function to send a transaction to the contract
    async function sendTransactionToContract() {

      const amountInWei = Number(ethers.utils.parseEther(_amount.toString()))
      // console.log(amountInWei)

      await contract.createOffer(_tokenId, _durationInSeconds, { value: amountInWei });
      console.log('Transaction mined!');
    }

    await sendTransactionToContract()

  } catch (error) {
    console.error('Error making offer:', error);
    throw error;
  }
}
