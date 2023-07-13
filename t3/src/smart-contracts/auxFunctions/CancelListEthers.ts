import { addresses, FrommeMarketplace_abi } from "../constants";
import { ethers } from 'ethers';

export default async function CancelList(_tokenId: number) {
  try {

    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider, "any");
    await provider.send("eth_requestAccounts", []);
    const signer: ethers.Signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const contract = new ethers.Contract(addresses.FrommeMarketplace, FrommeMarketplace_abi, signer) as ethers.Contract & {cancelList: (_tokenId: number) => Promise<ethers.ContractTransaction>}                    ;

    async function sendTransactionToContract(): Promise<void> {
      const tx = await contract.cancelList(_tokenId)
      await tx.wait(); // Wait for the transaction to be mined
      console.log('Transaction mined!');
    }

    await sendTransactionToContract();

  } catch (error) {
    console.error('Error reading owner of token:', error);
    throw error;
  }
}
