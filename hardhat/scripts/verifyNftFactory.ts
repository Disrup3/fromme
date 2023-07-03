import { ethers } from "hardhat";
import { verify } from "../utils/verify";

// no fa falta si ja ho hem fet al deploy
async function main() {
    
  const NAME = 'FROMME';
  const SYMBOL = 'FME';

  const NFT_FACTORY_ADDRESS = "0x8aF1CADcFC8bA57C78AEC34913A14C6294B07c51" // mumbai

  await verify(NFT_FACTORY_ADDRESS, [NAME, SYMBOL]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});