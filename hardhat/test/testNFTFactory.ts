import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { emit } from "process";

describe("NFTFactory", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const NAME = 'FROMME';
    const SYMBOL = 'FME';

    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();

    const NFTFactory = await ethers.getContractFactory("NFTFactory");
    const nftFactory = await NFTFactory.deploy(NAME, SYMBOL);

    return { nftFactory, owner, account1, account2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { nftFactory, owner } = await loadFixture(deployFixture);
      expect(await nftFactory.owner()).to.equal(owner.address);
    });

    it("Creates an NFT", async function () {
      const { nftFactory, account1 } = await loadFixture(deployFixture);

      const first_nft_tokenUri = "hola.test"
      const first_token_fee = 1000 // in base 10_000 (so 1000 = 10%)

      expect(await nftFactory.getCurrentTokenId()).to.equal(0);
      await nftFactory.connect(account1).createNFT(first_nft_tokenUri, first_token_fee)
      expect(await nftFactory.getCurrentTokenId()).to.equal(1);
      expect(await nftFactory.tokenURI(0)).to.equal(first_nft_tokenUri);     
    });

    it("Creates multiple NFT + Check Royalty info", async function () {
      const { nftFactory, account1, account2 } = await loadFixture(deployFixture);

      const sale_price = 100
      const fee_denominator = 10000

      const first_nft_tokenUri = "hola.test1"
      const first_token_fee = 1000 // in base 10_000 (so 1000 = 10%)

      const second_nft_tokenUri = "hola.test2"
      const second_token_fee = 2000 // in base 10_000 (so 1000 = 10%)

      expect(await nftFactory.getCurrentTokenId()).to.equal(0);

      await nftFactory.connect(account1).createNFT(first_nft_tokenUri, first_token_fee)
      expect(await nftFactory.getCurrentTokenId()).to.equal(1);
      expect(await nftFactory.tokenURI(0)).to.equal(first_nft_tokenUri);
      expect(await nftFactory.ownerOf(0)).to.equal(account1.address);
      expect((await nftFactory.royaltyInfo(0, sale_price))[0]).to.equal(account1.address);
      expect((await nftFactory.royaltyInfo(0, sale_price))[1].toNumber()).to.equal(sale_price * first_token_fee / fee_denominator);
      
      await nftFactory.connect(account2).createNFT(second_nft_tokenUri, second_token_fee)
      expect(await nftFactory.getCurrentTokenId()).to.equal(2)
      expect(await nftFactory.tokenURI(1)).to.equal(second_nft_tokenUri);
      expect(await nftFactory.ownerOf(1)).to.equal(account2.address);
      expect((await nftFactory.royaltyInfo(1, sale_price))[0]).to.equal(account2.address);
      expect((await nftFactory.royaltyInfo(1, sale_price))[1].toNumber()).to.equal(sale_price * second_token_fee / fee_denominator);

      // console.log((await nftFactory.royaltyInfo(1, sale_price))[1].toNumber())
    });

    it("Emits event when creting NFT an NFT", async function () {
      const { nftFactory, account1 } = await loadFixture(deployFixture);

      const first_nft_tokenUri = "hola.test"
      const first_token_fee = 1000 // in base 10_000 (so 1000 = 10%)

      expect(await nftFactory.connect(account1).createNFT(first_nft_tokenUri, first_token_fee))
      .to.emit(nftFactory, "NFTCreated")
      .withArgs(account1.address, 0, first_nft_tokenUri, first_token_fee)

    });

  });
});
