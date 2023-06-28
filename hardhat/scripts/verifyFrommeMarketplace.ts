import { ethers } from "hardhat";
import { verify } from "../utils/verify";

// no fa falta si ja ho hem fet al deploy
async function main() {

  const NFT_FACTORY_ADDRESS = "0xe0e34037e33FbB36ec89de6cB92477f7Bb5B04A7" // mumbai
  const FROMME_MARKETPLACE_ADDRESS = "0x5bD940E459982f385af60EfA14C12511109da6E9" // mumbai

  await verify(FROMME_MARKETPLACE_ADDRESS, [NFT_FACTORY_ADDRESS]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});