
import { addresses, FrommeMarketplace_abi } from "../constants";
import { ethers } from 'ethers';

export default async function ListItem(_tokenId: number, _amount: number, _durationInSeconds: number) {
  try {

    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const contract = new ethers.Contract(addresses.FrommeMarketplace, FrommeMarketplace_abi, signer) as ethers.Contract & { listItem: (_tokenId: number, _amount: number, _durationInSeconds: number) => Promise<void> }

    // Example function to send a transaction to the contract
    async function sendTransactionToContract() {

      const amountInWei = Number(ethers.utils.parseEther(_amount.toString()))
      // console.log(amountInWei)

      await contract.listItem(_tokenId, amountInWei, _durationInSeconds);
      console.log('Transaction mined!');
    }

    await sendTransactionToContract()

  } catch (error) {
    console.error('Error reading owner of token:', error);
    throw error;
  }
}
