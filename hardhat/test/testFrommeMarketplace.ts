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

const FEE_NUMERATOR = 1000;

describe("FrommeMarketplace", function () {
  // Need to deploy first the NFT contract and then the Marketplace
  async function deployFixture() {
    const NAME = 'FROMME';
    const SYMBOL = 'FME';

    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2, account3, account4] = await ethers.getSigners();

    const NFTFactory = await ethers.getContractFactory("NFTFactory");
    const nftFactory = await NFTFactory.deploy(NAME, SYMBOL);

    await nftFactory.connect(account1).createNFT("uri0", FEE_NUMERATOR)
    await nftFactory.connect(account1).createNFT("uri1", FEE_NUMERATOR)
    await nftFactory.connect(account2).createNFT("uri2", FEE_NUMERATOR)
    await nftFactory.connect(account2).createNFT("uri3", FEE_NUMERATOR)

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

        await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);
        await nftFactory.connect(account1).approve(frommeMarketplace.address, 1);

        await frommeMarketplace.connect(account1).createAuction(0, ethers.utils.parseEther('2'), 1000);

        await expect(frommeMarketplace.connect(account3).addBidAmount(0, { value: ethers.utils.parseEther('1') }))
        .to.be.revertedWith("Bid should be higher than current amount");

        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal('0x0000000000000000000000000000000000000000')
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('2'))

        await frommeMarketplace.connect(account3).addBidAmount(0, { value: ethers.utils.parseEther('3') })
        
        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal(account3.address)
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('3'))

        await expect(frommeMarketplace.connect(account3).claimAuction(0)).to.be.revertedWith("Auction is still open")
        advanceTime(1000)
        await expect(frommeMarketplace.connect(account4).claimAuction(0)).to.be.revertedWith("You are not the buyer")
        await expect(frommeMarketplace.connect(account4).addBidAmount(0, { value: ethers.utils.parseEther('3') }))
        .to.be.revertedWith("Auction is closed")

        // Ahora falta testear que se envia el dinero al comprador y que se reparten las royalties como toca
        const balance_inicial_1 = Number(await ethers.provider.getBalance(account1.address))
        const balance_inicial_3 = Number(await ethers.provider.getBalance(account3.address))
        const tx = await frommeMarketplace.connect(account3).claimAuction(0)
        const balance_final_1 = Number(await ethers.provider.getBalance(account1.address))
        const balance_final_3 = Number(await ethers.provider.getBalance(account3.address))

        // Faltaria validar que las comisiones funcionan aun cuando el comprador y vendedor son distintos al creador del nft
        const receipt = await tx.wait();
        const totalGasUsed = Number(receipt.gasUsed) * Number(receipt.effectiveGasPrice);  

        expect(balance_inicial_1 + Number(ethers.utils.parseEther('3'))).to.equal(balance_final_1)
        expect(balance_inicial_3).to.equal(balance_final_3 + totalGasUsed)

        // gas used in transaction IMPORTANT!!!!!! // - tx: const tx = await nft.connect(owner).withdraw()
        // const receipt = await tx.wait();
        // const totalGasUsed = Number(receipt.gasUsed) * Number(receipt.effectiveGasPrice);
        /////////////////////////////////////////////

        // const currentTime = await getCurrentTime();
        // const addedTime = currentTime + 1000;
        // console.log('Current time:', new Date(currentTime * 1000));
        // console.log('Added time:', new Date(addedTime * 1000));
    });

    it("Auction + Royalties to creator", async function () {
        const { nftFactory, frommeMarketplace, owner, account1, account2, account3, account4 } = await loadFixture(deployFixture);

        // send nft to another address, so the royalties are payed to 1, rest of price to 3, and 4 pays for it.
        await nftFactory.connect(account1).transfer(account3.address, 0);

        // approve from 3 to the marketplace
        await nftFactory.connect(account3).approve(frommeMarketplace.address, 0);

        // account 3 is the new owner of the nft
        await frommeMarketplace.connect(account3).createAuction(0, ethers.utils.parseEther('2'), 1000);

        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal('0x0000000000000000000000000000000000000000')
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('2'))

        await frommeMarketplace.connect(account4).addBidAmount(0, { value: ethers.utils.parseEther('10') })
        
        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal(account4.address)
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('10'))

        advanceTime(1000)

        // Ahora falta testear que se envia el dinero al comprador y que se reparten las royalties como toca
        const balance_inicial_1 = Number(await ethers.provider.getBalance(account1.address))
        const balance_inicial_3 = Number(await ethers.provider.getBalance(account3.address))
        const balance_inicial_4 = Number(await ethers.provider.getBalance(account4.address))

        const tx = await frommeMarketplace.connect(account4).claimAuction(0)
        const receipt = await tx.wait();
        const totalGasUsed = Number(receipt.gasUsed) * Number(receipt.effectiveGasPrice);  

        // Royalty amounts
        const current_amount = ((await frommeMarketplace.getAuction(0)).currentAmount)
        const royalty_fee = Number((await nftFactory.royaltyInfo(0, current_amount))[1])

        const balance_final_1 = Number(await ethers.provider.getBalance(account1.address))
        const balance_final_3 = Number(await ethers.provider.getBalance(account3.address))
        const balance_final_4 = Number(await ethers.provider.getBalance(account4.address))

        // Validar que las comisiones funcionan aun cuando el comprador y vendedor son distintos al creador del nft
        expect(balance_inicial_1 + royalty_fee).to.equal(balance_final_1) // cobra royalty
        // expect(balance_inicial_3 + Number(current_amount) - royalty_fee).to.equal(balance_final_3) // cobra el precio - royalty
        expect(balance_inicial_4 - totalGasUsed).to.equal(balance_final_4) // paga el precio + gasfee
    });

    it("List", async function () {
        const { nftFactory, frommeMarketplace, owner, account1, account2, account3, account4 } = await loadFixture(deployFixture);

        // approve from 1 to the marketplace
        await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);

        // account 3 is the new owner of the nft
        await frommeMarketplace.connect(account1).listItem(0, ethers.utils.parseEther('2'), 1000);

        // console.log(await frommeMarketplace.getListing(0))

        expect((await frommeMarketplace.getListing(0)).amount).to.equal(ethers.utils.parseEther('2'))

        await expect(frommeMarketplace.connect(account4).buyItem(0, { value: ethers.utils.parseEther('1') }))
        .to.be.revertedWith("Amount not enough");

        expect(await frommeMarketplace.connect(account4).buyItem(0, { value: ethers.utils.parseEther('2') }))
        .to.emit(frommeMarketplace, "ItemBought")
        .withArgs(0, account1.address, account4.address, ethers.utils.parseEther('2'))
    });

    it("Offer", async function () {
        const { nftFactory, frommeMarketplace, owner, account1, account2, account3, account4 } = await loadFixture(deployFixture);

        // approve from 1 to the marketplace
        await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);

        await expect(frommeMarketplace.connect(account1).acceptOffer(0))
        .to.be.revertedWith("No offer made");
        
        // account 3 is the new owner of the nft
        await frommeMarketplace.connect(account3).createOffer(0, 1000, { value: ethers.utils.parseEther('2') });

        expect((await frommeMarketplace.getOffer(0)).amount).to.equal(ethers.utils.parseEther('2'))

        expect(await frommeMarketplace.connect(account1).acceptOffer(0))
        .to.emit(frommeMarketplace, "OfferAccepted")
        .withArgs(0, account1.address, account3.address, ethers.utils.parseEther('2'))
    });

  });
});
