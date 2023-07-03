import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

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

    // console.log('nftFactory: ', nftFactory.address, '  -  frommeMarketplace:', frommeMarketplace.address)

    return { nftFactory, frommeMarketplace, owner, account1, account2, account3, account4 };
  }

  describe("Full Test", function () {
    it("Should set the right owner + Corrent nftFactoty address", async function () {
      const { nftFactory, frommeMarketplace, owner } = await loadFixture(deployFixture);
      expect(await nftFactory.owner()).to.equal(owner.address);
      expect(await frommeMarketplace.owner()).to.equal(owner.address);

      expect(await frommeMarketplace.getNftFactoryAddress()).to.equal(nftFactory.address);
    });

    it("Allow marketplace to transfer nft", async function () {
        const { nftFactory, frommeMarketplace, owner, account1, account2 } = await loadFixture(deployFixture);

        expect(await frommeMarketplace.isTokenIdAllowed(0)).to.equal(false)        
        await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);
        expect(await nftFactory.connect(account1).getApproved(0)).to.equal(frommeMarketplace.address)
        expect(await frommeMarketplace.isTokenIdAllowed(0)).to.equal(true)
    });

    it("Auction", async function () {
        const { nftFactory, frommeMarketplace, account1, account3, account4 } = await loadFixture(deployFixture);

        const DURATION_IN_SECONDS = 1000

        // try to create auction with 0 amount
        await expect(frommeMarketplace.connect(account1).createAuction(0, 0, DURATION_IN_SECONDS))
        .to.be.revertedWithCustomError(frommeMarketplace, "AmountMustBeAboveZero")

        // try to create auction with 0 amount
        await expect(frommeMarketplace.connect(account1).createAuction(0, ethers.utils.parseEther('2'), 0))
        .to.be.revertedWithCustomError(frommeMarketplace, "DurationMustBeAboveZero")

        // try to create auction without approval of the NFT
        await expect(frommeMarketplace.connect(account1).createAuction(0, ethers.utils.parseEther('2'), DURATION_IN_SECONDS))
        .to.be.revertedWithCustomError(frommeMarketplace, "NotApprovedForMarketplace")

        // approve
        await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);

        expect((await frommeMarketplace.getNftsInAution(0))).to.equal(false)
        await expect(frommeMarketplace.connect(account1).createAuction(0, ethers.utils.parseEther('2'), DURATION_IN_SECONDS))
        .to.emit(frommeMarketplace, "AuctionCreated")
        .withArgs(0, account1.address, ethers.utils.parseEther('2'), await getCurrentTime(), await getCurrentTime() + DURATION_IN_SECONDS)
        expect((await frommeMarketplace.getNftsInAution(0))).to.equal(true)

        // try to create auction in the same tokenId again: should fail
        await expect(frommeMarketplace.connect(account1).createAuction(0, ethers.utils.parseEther('2'), DURATION_IN_SECONDS))
        .to.be.revertedWith("NFT is already in AUCTION")

        // try to bid for nft not in auction
        // not passing as the require can never be reached, if there is no auction, the endTime (first require) alwaysreverts first
        // await expect(frommeMarketplace.connect(account1).addBidAmount(1, { value: ethers.utils.parseEther('3') }))
        // .to.be.revertedWith("NFT is NOT in AUCTION")

        // try to bid lower than previous bid
        await expect(frommeMarketplace.connect(account3).addBidAmount(0, { value: ethers.utils.parseEther('1') }))
        .to.be.revertedWith("Bid should be higher than starting amount");

        // auction created without any bid
        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal('0x0000000000000000000000000000000000000000')
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('0'))

        // add bids: 
        await frommeMarketplace.connect(account4).addBidAmount(0, { value: ethers.utils.parseEther('3') })

        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal(account4.address)
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('3'))

        await frommeMarketplace.connect(account3).addBidAmount(0, { value: ethers.utils.parseEther('4') })
        
        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal(account3.address)
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('4'))

        await expect(frommeMarketplace.connect(account3).claimAuction(0)).to.be.revertedWith("Auction is still open")
        advanceTime(DURATION_IN_SECONDS)
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

        const expectedDifference1 = balance_inicial_1 * 0.0000001;
        const expectedDifference2 = balance_inicial_3 * 0.0000001;

        expect(balance_inicial_1 + Number(ethers.utils.parseEther('4'))).to.be.closeTo(balance_final_1, expectedDifference1)
        expect(balance_inicial_3).to.be.closeTo(balance_final_3 + totalGasUsed, expectedDifference2)


        //// Does not match exactly, need to to a closeTo :)
        // expect(balance_inicial_1 + Number(ethers.utils.parseEther('3'))).to.equal(balance_final_1)
        // expect(balance_inicial_3).to.equal(balance_final_3 + totalGasUsed)

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
        const { nftFactory, frommeMarketplace, account1, account3, account4 } = await loadFixture(deployFixture);

        // send nft to another address, so the royalties are payed to 1, rest of price to 3, and 4 pays for it.
        await nftFactory.connect(account1).transfer(account3.address, 0);

        // approve from 3 to the marketplace
        await nftFactory.connect(account3).approve(frommeMarketplace.address, 0);

        // account 3 is the new owner of the nft
        await frommeMarketplace.connect(account3).createAuction(0, ethers.utils.parseEther('2'), 1000);

        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal('0x0000000000000000000000000000000000000000')
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('0'))

        await frommeMarketplace.connect(account4).addBidAmount(0, { value: ethers.utils.parseEther('3') })
        
        expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal(account4.address)
        expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('3'))

        advanceTime(1000)

        // Ahora falta testear que se envia el dinero al comprador y que se reparten las royalties como toca
        const balance_inicial_1 = Number(await ethers.provider.getBalance(account1.address))
        const balance_inicial_3 = Number(await ethers.provider.getBalance(account3.address))
        const balance_inicial_4 = Number(await ethers.provider.getBalance(account4.address))

        // Royalty amounts
        const current_amount = ((await frommeMarketplace.getAuction(0)).currentAmount)
        const royalty_fee = Number((await nftFactory.royaltyInfo(0, current_amount))[1])

        const tx = await frommeMarketplace.connect(account4).claimAuction(0)
        const receipt = await tx.wait();
        const totalGasUsed = Number(receipt.gasUsed) * Number(receipt.effectiveGasPrice);  

        const balance_final_1 = Number(await ethers.provider.getBalance(account1.address))
        const balance_final_3 = Number(await ethers.provider.getBalance(account3.address))
        const balance_final_4 = Number(await ethers.provider.getBalance(account4.address))

        const expectedDifference1 = balance_final_1 * 0.0000001;
        const expectedDifference3 = balance_final_3 * 0.0000001;
        const expectedDifference4 = balance_final_4 * 0.0000001;

        // Validar que las comisiones funcionan aun cuando el comprador y vendedor son distintos al creador del nft
        // expect(balance_inicial_1 + royalty_fee).to.equal(balance_final_1) // cobra royalty
        expect(balance_inicial_1 + royalty_fee).to.be.closeTo(balance_final_1, expectedDifference1)

        // expect(balance_inicial_3 + Number(current_amount) - royalty_fee).to.equal(balance_final_3) // cobra el precio - royalty
        expect(balance_inicial_3 + Number(current_amount) - royalty_fee).to.be.closeTo(balance_final_3, expectedDifference3)

        // expect(balance_inicial_4 - totalGasUsed).to.equal(balance_final_4) // paga el precio + gasfee
        expect(balance_inicial_4 - totalGasUsed).to.be.closeTo(balance_final_4, expectedDifference4)
    });

    it("Auction Canceled", async function () {
      const { nftFactory, frommeMarketplace, account1, account3, account4 } = await loadFixture(deployFixture);
    
      // approve from 1 to the marketplace
      await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);

      // account 3 is the new owner of the nft
      await frommeMarketplace.connect(account1).createAuction(0, ethers.utils.parseEther('2'), 1000);

      await frommeMarketplace.connect(account3).addBidAmount(0, { value: ethers.utils.parseEther('3') })
      
      expect((await frommeMarketplace.getAuction(0)).currentBuyer).to.equal(account3.address)
      expect((await frommeMarketplace.getAuction(0)).currentAmount).to.equal(ethers.utils.parseEther('3'))

      // cancel auction - return money to current bider + emit event
      expect(await frommeMarketplace.connect(account1).cancelAuction(0))
      .to.emit(frommeMarketplace, "AuctionCanceled")
      .withArgs(0, account1.address) 
    });


    it("List", async function () {
        const { nftFactory, frommeMarketplace, owner, account1, account2, account3, account4 } = await loadFixture(deployFixture);

        const DURATION_IN_SECONDS = 1000;

        // try to list with 0 amount
        await expect(frommeMarketplace.connect(account1).listItem(0, 0, DURATION_IN_SECONDS))
        .to.be.revertedWithCustomError(frommeMarketplace, "AmountMustBeAboveZero");

        // try to list without approval
        await expect(frommeMarketplace.connect(account1).listItem(0, ethers.utils.parseEther('2'), DURATION_IN_SECONDS))
        .to.be.revertedWithCustomError(frommeMarketplace, "NotApprovedForMarketplace");

        // approve from 1 to the marketplace
        await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);

        // account 1 lists nft
        await frommeMarketplace.connect(account1).listItem(0, ethers.utils.parseEther('2'), DURATION_IN_SECONDS);
        // console.log(await frommeMarketplace.getListing(0))
        expect((await frommeMarketplace.getListing(0)).amount).to.equal(ethers.utils.parseEther('2'))

        // cancel listing
        await expect(frommeMarketplace.connect(account4).cancelList(0))
        .to.be.revertedWithCustomError(frommeMarketplace, "NotOwner");

        expect(await frommeMarketplace.connect(account1).cancelList(0))
        .to.emit(frommeMarketplace, "ItemListCanceled")
        .withArgs(0, account1.address)  

        // list again
        await frommeMarketplace.connect(account1).listItem(0, ethers.utils.parseEther('2'), DURATION_IN_SECONDS);

        // buy item
        await expect(frommeMarketplace.connect(account4).buyItem(0, { value: ethers.utils.parseEther('1') }))
        .to.be.revertedWith("Amount not enough");

        expect(await frommeMarketplace.connect(account4).buyItem(0, { value: ethers.utils.parseEther('2') }))
        .to.emit(frommeMarketplace, "ItemBought")
        .withArgs(0, account1.address, account4.address, ethers.utils.parseEther('2'))
    });

    it("List + Royalties to creator", async function () {
      const { nftFactory, frommeMarketplace, owner, account1, account2, account3, account4 } = await loadFixture(deployFixture);

      const DURATION_IN_SECONDS = 1000;

      // send nft to another address, so the royalties are payed to 1, rest of price to 3, and 4 pays for it.
      await nftFactory.connect(account1).transfer(account3.address, 0);

      // approve from 1 to the marketplace
      await nftFactory.connect(account3).approve(frommeMarketplace.address, 0);

      // account 1 lists nft
      await frommeMarketplace.connect(account3).listItem(0, ethers.utils.parseEther('2'), DURATION_IN_SECONDS);
      // console.log(await frommeMarketplace.getListing(0))
      expect((await frommeMarketplace.getListing(0)).amount).to.equal(ethers.utils.parseEther('2'))

      // Ahora falta testear que se envia el dinero al comprador y que se reparten las royalties como toca
      const balance_inicial_1 = Number(await ethers.provider.getBalance(account1.address))
      const balance_inicial_3 = Number(await ethers.provider.getBalance(account3.address))
      const balance_inicial_4 = Number(await ethers.provider.getBalance(account4.address))

      // Royalty amounts
      const current_amount = ((await frommeMarketplace.getListing(0)).amount)
      const royalty_fee = Number((await nftFactory.royaltyInfo(0, current_amount))[1])

      const tx = await frommeMarketplace.connect(account4).buyItem(0,  { value: ethers.utils.parseEther('2') })
      const receipt = await tx.wait();
      const totalGasUsed = Number(receipt.gasUsed) * Number(receipt.effectiveGasPrice);  

      const balance_final_1 = Number(await ethers.provider.getBalance(account1.address))
      const balance_final_3 = Number(await ethers.provider.getBalance(account3.address))
      const balance_final_4 = Number(await ethers.provider.getBalance(account4.address))

      const expectedDifference1 = balance_final_1 * 0.0000001;
      const expectedDifference3 = balance_final_3 * 0.0000001;
      const expectedDifference4 = balance_final_4 * 0.0000001;

      // Validar que las comisiones funcionan aun cuando el comprador y vendedor son distintos al creador del nft
      expect(balance_inicial_1 + royalty_fee).to.be.closeTo(balance_final_1, expectedDifference1)
      expect(balance_inicial_3 + Number(current_amount) - royalty_fee).to.be.closeTo(balance_final_3, expectedDifference3)
      expect(balance_inicial_4 - totalGasUsed -  Number(current_amount)).to.be.closeTo(balance_final_4, expectedDifference4)
  });

    it("Offer", async function () {
        const { nftFactory, frommeMarketplace, owner, account1, account2, account3, account4 } = await loadFixture(deployFixture);

        const DURATION_IN_SECONDS = 1000;

        // try to accept offer for an nft that has not been approved
        await frommeMarketplace.connect(account3).createOffer(1, DURATION_IN_SECONDS, { value: ethers.utils.parseEther('2') });
        await expect(frommeMarketplace.connect(account1).acceptOffer(1))
        .to.be.revertedWithCustomError(frommeMarketplace, "NotApprovedForMarketplace");

        // approve from 1 to the marketplace
        await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);

        await expect(frommeMarketplace.connect(account1).acceptOffer(0))
        .to.be.revertedWith("No offer made");
        
        // account 3 wants to buy the nft
        await frommeMarketplace.connect(account3).createOffer(0, DURATION_IN_SECONDS, { value: ethers.utils.parseEther('2') });

        expect((await frommeMarketplace.getOffer(0)).amount).to.equal(ethers.utils.parseEther('2'))
        expect((await frommeMarketplace.getOffer(0)).buyer).to.equal(account3.address)

        // cancel offer
        await expect(frommeMarketplace.connect(account3).cancelOffer(0))
        .to.emit(frommeMarketplace, "OfferCanceled")
        .withArgs(0, account3.address)

        expect((await frommeMarketplace.getOffer(0)).amount).to.equal(0)
        expect((await frommeMarketplace.getOffer(0)).buyer).to.equal('0x0000000000000000000000000000000000000000')

        await expect(frommeMarketplace.connect(account3).createOffer(0, DURATION_IN_SECONDS, { value: ethers.utils.parseEther('3') }))
        .to.emit(frommeMarketplace, "OfferCreated")
        .withArgs(0, account3.address, ethers.utils.parseEther('3'), await getCurrentTime(), await getCurrentTime() + DURATION_IN_SECONDS)

        // try to add lower offer
        await expect(frommeMarketplace.connect(account3).createOffer(0, DURATION_IN_SECONDS, { value: ethers.utils.parseEther('1') }))
        .to.be.revertedWith("Previous offer is higher")

        expect(await nftFactory.ownerOf(0)).to.be.equal(account1.address)
        expect(await frommeMarketplace.connect(account1).acceptOffer(0))
        .to.emit(frommeMarketplace, "OfferAccepted")
        .withArgs(0, account1.address, account3.address, ethers.utils.parseEther('2'))
        expect(await nftFactory.ownerOf(0)).to.be.equal(account3.address)
    });

    it("Auction + List / Offer", async function () {
      const { nftFactory, frommeMarketplace, account1, account2, account3 } = await loadFixture(deployFixture);

      const DURATION_IN_SECONDS = 1000;

      // approve from 0 and 1 to the marketplace
      await nftFactory.connect(account1).approve(frommeMarketplace.address, 0);
      await nftFactory.connect(account1).approve(frommeMarketplace.address, 1);

      // first create auction for 0 and then try to list and accepts offer
      expect((await frommeMarketplace.getNftsInAution(0))).to.equal(false)
      await frommeMarketplace.connect(account1).createAuction(0, ethers.utils.parseEther('2'), DURATION_IN_SECONDS)
      expect((await frommeMarketplace.getNftsInAution(0))).to.equal(true)

      // try to list the nft in auction
      await expect(frommeMarketplace.connect(account1).listItem(0, ethers.utils.parseEther('2'), DURATION_IN_SECONDS))
      .to.be.revertedWith("NFT is in AUCTION, can't be listed, cancel AUCTION before LIST")

      // create an offer - should work fine
      await frommeMarketplace.connect(account3).createOffer(0, DURATION_IN_SECONDS, { value: ethers.utils.parseEther('2') });

      // try to accept the offer - should be reverted
      await expect(frommeMarketplace.connect(account1).acceptOffer(0))
      .to.be.revertedWith("NFT is in AUCTION, can't accept offer")

      // cancel the auction and try to list and offer
      expect(await frommeMarketplace.connect(account1).cancelAuction(0))
      expect((await frommeMarketplace.getNftsInAution(0))).to.equal(false)

      // list now, before accepting the offer
      expect((await frommeMarketplace.getNftsInList(0))).to.equal(false)
      await frommeMarketplace.connect(account1).listItem(0, ethers.utils.parseEther('2'), DURATION_IN_SECONDS)
      expect((await frommeMarketplace.getNftsInList(0))).to.equal(true)

    });

  });
});
