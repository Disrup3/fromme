import { ethers } from "hardhat";
import { verify } from "../utils/verify";

// no fa falta si ja ho hem fet al deploy
async function main() {

  const NFT_FACTORY_ADDRESS = "0x8aF1CADcFC8bA57C78AEC34913A14C6294B07c51" // mumbai
  const FROMME_MARKETPLACE_ADDRESS = "0xc4b556711c913AcD5154DCAB0A4ba6b76375b874" // mumbai

  await verify(FROMME_MARKETPLACE_ADDRESS, [NFT_FACTORY_ADDRESS]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});