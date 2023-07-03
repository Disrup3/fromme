// Once the contracts are deployed in the sepolia network
// put the addresses here and run the script to create several nfts and 
// operate with them in the marketplace

import { ethers, network } from "hardhat";

async function main() {

  // need to deploy the contracts first - then add here the addresses
  const NFTFACTORY_ADDRESS = "0x8aF1CADcFC8bA57C78AEC34913A14C6294B07c51";
  const FROMME_MARKETPLACE_ADDRESS = "0xc4b556711c913AcD5154DCAB0A4ba6b76375b874";

  const NFTFactory = await ethers.getContractFactory("NFTFactory");
  const nftFactory = NFTFactory.attach(NFTFACTORY_ADDRESS);

  const FrommeMarketplace = await ethers.getContractFactory("FrommeMarketplace");
  const frommeMarketplace = FrommeMarketplace.attach(FROMME_MARKETPLACE_ADDRESS);

  console.log(`NFTFactory with deployed to ${nftFactory.address}`);
  console.log(`FrommeMarketplace with deployed to ${frommeMarketplace.address}`);

  console.log('Generating Interactions with the NFTFactory and the FrommeMarketplace...')

  const [account] = await ethers.getSigners();

  // await nftFactory.connect(account).createNFT(" ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/0", 1000)
  // await nftFactory.connect(account).createNFT(" ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/1", 2000)
  // await nftFactory.connect(account).createNFT(" ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/3", 100)
  // await nftFactory.connect(account).createNFT(" ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/4", 200)


  // await nftFactory.connect(account).approve(frommeMarketplace.address, 0);
  // await frommeMarketplace.connect(account).createAuction(0, ethers.utils.parseEther('0.001'), 1000)

  // await nftFactory.connect(account).approve(frommeMarketplace.address, 1);
  // await frommeMarketplace.connect(account).createAuction(1, ethers.utils.parseEther('0.002'), 2000)  

  // await nftFactory.connect(account).approve(frommeMarketplace.address, 2);
  // await frommeMarketplace.connect(account).listItem(2, ethers.utils.parseEther('0.001'), 1000)

  // await nftFactory.connect(account).approve(frommeMarketplace.address, 3);
  // await frommeMarketplace.connect(account).listItem(3, ethers.utils.parseEther('0.002'), 2000)  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
