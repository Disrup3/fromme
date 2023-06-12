// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// COntract to be able to generate NFTs
// Using the ERC721UriStorage to generate a single collection
// ERC 2981 to manage the royalties

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";



contract NFTFactory is ERC721Royalty, ERC721URIStorage, Ownable {

    event NFTCreated(
        address indexed creator,
        uint256 indexed tokenId,
        string tokenUri,
        uint96 feeNumerator
    );

    uint private tokenId;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        tokenId = 0;
    }

    // Creates an NFT with automatic (incremental) tokenId, mints it to the msg.sender address 
    // The tokenURI cannot change, the idea is that the metadata cannot change and is directly uploaded into IPFS
    function createNFT(string memory _tokenURI, uint96 _feeNumerator) external {
        _mint(msg.sender, tokenId); // creates the new NFT
        _setTokenURI(tokenId, _tokenURI); // sets token URI for the nft created
        _setTokenRoyalty(tokenId, msg.sender, _feeNumerator);
        emit NFTCreated(msg.sender, tokenId, _tokenURI, _feeNumerator);
        tokenId += 1; // increment tokenId
    }

    // override functions
    function _burn(uint256 _tokenId) internal override(ERC721URIStorage, ERC721Royalty) {
        super._burn(_tokenId);
    }

    function supportsInterface(bytes4 _interfaceId) public view override(ERC721URIStorage, ERC721Royalty) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }

    function tokenURI(uint256 _tokenId) public view override(ERC721URIStorage, ERC721) returns (string memory) {
        return super.tokenURI(_tokenId);
    }

    // get functions
    function getCurrentTokenId() external view returns(uint) {
        return tokenId;
    }  

}