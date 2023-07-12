import { addresses, FrommeMarketplace_abi } from "../constants";
import { ethers } from "ethers";

// Load environment variables from .env file
// dotenv.config({ path: '..\..\..\.env' });

export default async function useListItem(
  _tokenId: number,
  _amount: number,
  _durationInSeconds: number
) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const contract = new ethers.Contract(
      addresses.FrommeMarketplace,
      FrommeMarketplace_abi,
      signer
    ) as ethers.Contract & {
      listItem: (
        _tokenId: number,
        amountInWei: ethers.BigNumber,
        _durationInSeconds: number
      ) => Promise<any>;
    };

    // Example function to send a transaction to the contract
    async function sendTransactionToContract() {
      const amountInWei = ethers.utils.parseEther(_amount.toString());
      // console.log(amountInWei)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tx = await contract.listItem(
        _tokenId,
        amountInWei,
        _durationInSeconds
      );

      await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction mined!");
    }

    await sendTransactionToContract();
  } catch (error) {
    console.error("Error reading owner of token:", error);
    throw error;
  }
}
