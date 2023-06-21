// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Uncomment this line to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/interfaces/IERC4906.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC721Royalties is IERC721 {
    function royaltyInfo(uint256 tokenId, uint256 value) external view returns (address receiver, uint256 royaltyAmount);
}

error NotAllowed();
error AlreadyAllowed();
error NotOwner();
error AmountMustBeAboveZero();
error NotApprovedForMarketplace();

contract FrommeMarketplace is Ownable{

    // STRUCTS
    struct Auction {
        uint256 tokenId;
        address seller;
        uint256 startingAmount;
        uint256 currentAmount;
        address currentBuyer;
        uint256 startingTime;
        uint256 endTime;
    }
    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 amount;
        uint256 startingTime;
        uint256 endTime;
    }
    struct Offer {
        uint256 tokenId;
        address buyer;
        uint256 amount;
        uint256 startingTime;
        uint256 endTime;
    }

    // EVENTS
    event AunctionCreated(
        uint256 indexed tokenId,
        address seller,
        uint256 startingAmount,
        uint256 startingTime,
        uint256 endTime
    );
    event BetAdded(
        uint256 indexed tokenId,
        uint256 currentAmount,
        address currentBuyer
    );
    event AuctionClaimed(
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 finalAmount
    );

    event ItemListed(
        uint256 indexed tokenId,
        address seller,
        uint256 amount,
        uint256 startingTime,
        uint256 endTime
    );
    event ItemBought(
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 amount
    );

    event OfferCreated(
        uint256 indexed tokenId,
        address buyer,
        uint256 amount,
        uint256 startingTime,
        uint256 endTime
    );
    event OfferAccepted(
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 amount
    );


    address private immutable i_nft_factory_address;
    IERC721Royalties nftContract;

    mapping(address => bool) public allowedAddress;
    mapping(uint256 => Auction) private auctions; // only one auction per nft at the same time
    mapping(uint256 => Listing) private listings; // only one listing per nft at the same time
    mapping(uint256 => Offer) private offers; // only one offer per nft at the same time - keep higher offer

    modifier onlyAllowed(address _address) {
        if (!allowedAddress[_address]) {
            revert NotAllowed();
        }
        _;
    }

    modifier onlyNftOwner(
        uint256 _tokenId,
        address _address
    ) {
        address owner = nftContract.ownerOf(_tokenId);
        if (_address != owner) {
            revert NotOwner();
        }
        _;
    }

    constructor(address _nftFactoryAddress) {
        allowedAddress[msg.sender] = true; // the owner is allowed
        i_nft_factory_address = _nftFactoryAddress;
        nftContract = IERC721Royalties(_nftFactoryAddress);
    }

    // MAIN FUNCTIONS
    function createAuction(uint _tokenId, uint _startingAmount, uint _durationInSeconds) external onlyAllowed(msg.sender) onlyNftOwner(_tokenId, msg.sender) {
        if (_startingAmount <= 0) {
            revert AmountMustBeAboveZero();
        }
        if (nftContract.getApproved(_tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }
        // The duration in seconds is added to the current time to get the endTime
        auctions[_tokenId] = Auction(_tokenId, msg.sender, _startingAmount, _startingAmount, address(0), block.timestamp, block.timestamp + _durationInSeconds);
        emit AunctionCreated(_tokenId, msg.sender, _startingAmount, block.timestamp, block.timestamp + _durationInSeconds);
    }

    function addBetAmount(uint _tokenId) external payable {
        require(block.timestamp < auctions[_tokenId].endTime, "Auction is closed");
        require(msg.value > auctions[_tokenId].currentAmount, "Bet should be higher than current price");
        auctions[_tokenId].currentAmount = msg.value;
        auctions[_tokenId].currentBuyer = msg.sender;
        emit BetAdded(_tokenId, msg.value, msg.sender);
    }

    function claimAuction(uint _tokenId) external payable {
        require(block.timestamp > auctions[_tokenId].endTime, "Auction is still open");
        require(msg.sender == auctions[_tokenId].currentBuyer, "You are not the buyer"); // if there is no bet: buyer = 0x00 and no one can claim
        
        nftContract.transferFrom(auctions[_tokenId].seller, msg.sender, _tokenId); // sends NFT to buyer

        // manage royalties
        (address addressRoyalty, uint amountRoyalty) = nftContract.royaltyInfo(_tokenId, auctions[_tokenId].currentAmount);
        // console.log(addressRoyalty, amountRoyalty);

        (bool successRoyalty, ) = addressRoyalty.call{value: amountRoyalty}("");
        require(successRoyalty, "Royalty transfer failed");

        (bool success, ) = auctions[_tokenId].seller.call{value: auctions[_tokenId].currentAmount - amountRoyalty}("");
        require(success, "Transfer failed");

        emit AuctionClaimed(_tokenId, auctions[_tokenId].seller, msg.sender, auctions[_tokenId].currentAmount);
    }


    // LIST 
    function listItem(uint _tokenId, uint _amount, uint _durationInSeconds) external onlyNftOwner(_tokenId, msg.sender) {
        if (_amount <= 0) {
            revert AmountMustBeAboveZero();
        }
        if (nftContract.getApproved(_tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }
        listings[_tokenId] = Listing(_tokenId, msg.sender, _amount, block.timestamp, block.timestamp + _durationInSeconds);
        emit ItemListed(_tokenId, msg.sender, _amount, block.timestamp, block.timestamp + _durationInSeconds);
    }

    function buyItem(uint _tokenId) external payable {
        require(msg.value >= listings[_tokenId].amount, "Amount not enough");
        
        nftContract.transferFrom(listings[_tokenId].seller, msg.sender, _tokenId); // sends NFT to buyer

        // manage royalties
        (address addressRoyalty, uint amountRoyalty) = nftContract.royaltyInfo(_tokenId, listings[_tokenId].amount);
        // console.log(addressRoyalty, amountRoyalty);

        (bool successRoyalty, ) = addressRoyalty.call{value: amountRoyalty}("");
        require(successRoyalty, "Royalty transfer failed");

        (bool success, ) = listings[_tokenId].seller.call{value: listings[_tokenId].amount - amountRoyalty}("");
        require(success, "Transfer failed");

        emit ItemBought(_tokenId, listings[_tokenId].seller, msg.sender, listings[_tokenId].amount);
    }

    // OFFER - allows to create over an existing offer, as long as the amount is higher
    // need to consider the datetime effect, still some work to do
    function createOffer(uint _tokenId, uint _durationInSeconds) external payable {
        require(msg.value > offers[_tokenId].amount, "Previous offer is higher");

        offers[_tokenId] = Offer(_tokenId, msg.sender, msg.value, block.timestamp, block.timestamp + _durationInSeconds);
        emit OfferCreated(_tokenId, msg.sender,  msg.value, block.timestamp, block.timestamp + _durationInSeconds);
    }

    function acceptOffer(uint _tokenId) external onlyNftOwner(_tokenId, msg.sender) {
        require(offers[_tokenId].amount > 0, "No offer made");
        if (nftContract.getApproved(_tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }

        nftContract.transferFrom(msg.sender, offers[_tokenId].buyer, _tokenId); // sends NFT to buyer

        // manage royalties
        (address addressRoyalty, uint amountRoyalty) = nftContract.royaltyInfo(_tokenId, offers[_tokenId].amount);
        // console.log(addressRoyalty, amountRoyalty);

        (bool successRoyalty, ) = addressRoyalty.call{value: amountRoyalty}("");
        require(successRoyalty, "Royalty transfer failed");

        (bool success, ) = msg.sender.call{value: offers[_tokenId].amount - amountRoyalty}("");
        require(success, "Transfer failed");

        emit OfferAccepted(_tokenId, msg.sender, offers[_tokenId].buyer, offers[_tokenId].amount);
    }


    // Other functions
    function addAllowedAddress(address _address) external onlyOwner {
        if (allowedAddress[_address]) {
            revert AlreadyAllowed();
        }
        allowedAddress[_address] = true;
    }

    function isTokenIdAllowed(uint _tokenId) external view returns(bool) {
        return nftContract.getApproved(_tokenId) == address(this);
    }

    // get functions
    function getNftFactoryAddress() external view returns(address) {
        return i_nft_factory_address;
    }  

    function getAuction(uint256 _tokenId) external view returns(Auction memory ) {
        return auctions[_tokenId];
    }  

    function getListing(uint256 _tokenId) external view returns(Listing memory ) {
        return listings[_tokenId];
    }  

    function getOffer(uint256 _tokenId) external view returns(Offer memory ) {
        return offers[_tokenId];
    }  
}