import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { emit } from "process";


async function getCurrentTime() {
    const blockNumber = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNumber);
    const currentTime = block.timestamp;
    
    return currentTime;
}

async function advanceTime(seconds: number) {
    await time.increase(seconds); // 1 hour + 10 seconds for margin
}

describe("FrommeMarketplace", function () {
  // Need to deploy first the NFT contract and then the Marketplace
  async function deployFixture() {
    const NAME = 'FROMME';
    const SYMBOL = 'FME';

    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2, account3, account4] = await ethers.getSigners();

    const NFTFactory = await ethers.getContractFactory("NFTFactory");
    const nftFactory = await NFTFactory.deploy(NAME, SYMBOL);

    await nftFactory.connect(account1).createNFT("uri0", 0)
    await nftFactory.connect(account1).createNFT("uri1", 1000)
    await nftFactory.connect(account2).createNFT("uri2", 2000)
    await nftFactory.connect(account2).createNFT("uri3", 3000)

    const FrommeMarketplace = await ethers.getContractFactory("FrommeMarketplace");
    const frommeMarketplace = await FrommeMarketplace.deploy(nftFactory.address);

    console.log('nftFactory: ', nftFactory.address, '  -  frommeMarketplace:', frommeMarketplace.address)

    return { nftFactory, frommeMarketplace, owner, account1, account2, account3, account4 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { nftFactory, frommeMarketplace, owner } = await loadFixture(deployFixture);
      expect(await nftFactory.owner()).to.equal(owner.address);
      expect(await frommeMarketplace.owner()).to.equal(owner.address);
    });

    it("Allow marketplace to transfer nft", async function () {
        const { nftFactory, frommeMarketplace, owner, account1, account2 } = await loadFixture(deployFixture);

        expect(await frommeMarketplace.isTokenIdAllowed(0)).to.equal(false)        
        await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);
        expect(await nftFactory.connect(account1).getApproved(0)).to.equal(frommeMarketplace.address)
        expect(await frommeMarketplace.isTokenIdAllowed(0)).to.equal(true)
    });

    it("Auction", async function () {
        const { nftFactory, frommeMarketplace, owner, account1, account2, account3, account4 } = await loadFixture(deployFixture);

        await frommeMarketplace.connect(owner).addAllowedAddress(account1.address);
        await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);
        await nftFactory.connect(account1).approve(frommeMarketplace.address, 1);

        await frommeMarketplace.connect(account1).createAuction(0, ethers.utils.parseEther('2'), 1000);

        await expect(frommeMarketplace.connect(account3).addBetAmount(0, { value: ethers.utils.parseEther('1') })).to.be.revertedWith("Bet should be higher than current price");

        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal('0x0000000000000000000000000000000000000000')
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('2'))

        // console.log('account3 balance:', Number(await ethers.provider.getBalance(account3.address)))
        await frommeMarketplace.connect(account3).addBetAmount(0, { value: ethers.utils.parseEther('3') })
        // console.log('account3 balance:', Number(await ethers.provider.getBalance(account3.address)))
        
        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal(account3.address)
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('3'))

        await expect(frommeMarketplace.connect(account3).claimAuction(0)).to.be.revertedWith("Auction is still open")
        advanceTime(1000)
        await expect(frommeMarketplace.connect(account4).claimAuction(0)).to.be.revertedWith("You are not the buyer")
        await expect(frommeMarketplace.connect(account4).addBetAmount(0, { value: ethers.utils.parseEther('3') })).to.be.revertedWith("Auction is closed")



        // Ahora falta testear que se envia el dinero al comprador y que se reparten las royalties como toca
        // console.log('account1 balance:', account1.address, Number(await ethers.provider.getBalance(account1.address)))
        // console.log('account3 balance:', account3.address, Number(await ethers.provider.getBalance(account3.address)))
        const tx = await frommeMarketplace.connect(account3).claimAuction(0)
        // console.log('account1 balance:', account1.address, Number(await ethers.provider.getBalance(account1.address)))
        // console.log('account3 balance:', account3.address, Number(await ethers.provider.getBalance(account3.address)))

        // Faltaria validar que las comisiones funcionan aun cuando el comprador y vendedor son distintos al creador del nft


        // gas used in transaction IMPORTANT!!!!!! // - tx: const tx = await nft.connect(owner).withdraw()
        // const receipt = await tx.wait();
        // const totalGasUsed = Number(receipt.gasUsed) * Number(receipt.effectiveGasPrice);
        /////////////////////////////////////////////

        // const currentTime = await getCurrentTime();
        // const addedTime = currentTime + 1000;
        // console.log('Current time:', new Date(currentTime * 1000));
        // console.log('Added time:', new Date(addedTime * 1000));

    });

  });
});
