import { ethers } from "hardhat";
import { verify } from "../utils/verify";

// no fa falta si ja ho hem fet al deploy
async function main() {
    
  const NAME = 'FROMME';
  const SYMBOL = 'FME';

  const NFT_FACTORY_ADDRESS = "0xe0e34037e33FbB36ec89de6cB92477f7Bb5B04A7" // mumbai

  await verify(NFT_FACTORY_ADDRESS, [NAME, SYMBOL]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});