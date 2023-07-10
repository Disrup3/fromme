import { ethers, network } from "hardhat";

async function main() {

  const NFTFACTORY_ADDRESS = "0x8aF1CADcFC8bA57C78AEC34913A14C6294B07c51"; // mumbai

  // Contracts are deployed using the first signer/account by default
  const [owner, account1, account2] = await ethers.getSigners();

  const FrommeMarketplace = await ethers.getContractFactory("FrommeMarketplace");
  const frommeMarketplace = await FrommeMarketplace.deploy(NFTFACTORY_ADDRESS);

  await frommeMarketplace.deployed();

  console.log(
    `FrommeMarketplace with deployed to ${frommeMarketplace.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
