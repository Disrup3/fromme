import { ethers, network } from "hardhat";

async function main() {

  const NAME = 'FROMME';
  const SYMBOL = 'FME';

  // Contracts are deployed using the first signer/account by default
  const [owner, account1, account2] = await ethers.getSigners();

  const NFTFactory = await ethers.getContractFactory("NFTFactory");
  const nftFactory = await NFTFactory.deploy(NAME, SYMBOL);

  await nftFactory.deployed();

  console.log(
    `NFTFactory with deployed to ${nftFactory.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
