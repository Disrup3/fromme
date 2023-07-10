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
error DurationMustBeAboveZero();
error NotApprovedForMarketplace();
error PreviousAuctionStillOpen();
error PreviousAuctionNotClaimed();

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
    event AuctionCreated(
        uint256 indexed tokenId,
        address seller,
        uint256 startingAmount,
        uint256 startingTime,
        uint256 endTime
    );
    event BidAdded(
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
    event AuctionCanceled(
        uint256 indexed tokenId,
        address seller
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
    event ItemListCanceled(
        uint256 indexed tokenId,
        address seller
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
    event OfferCanceled(
        uint256 indexed tokenId,
        address seller
    );

    address private immutable i_nft_factory_address;
    IERC721Royalties nftContract;

    mapping(uint256 => Auction) private auctions; // only one auction per nft at the same time
    mapping(uint256 => Listing) private listings; // only one listing per nft at the same time
    mapping(uint256 => Offer) private offers; // only one offer per nft at the same time - keep higher offer

    mapping(uint256 => bool) private nftsInAuction; // false = not in auction
    mapping(uint256 => bool) private nftsInList; // false = not listed

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
        i_nft_factory_address = _nftFactoryAddress;
        nftContract = IERC721Royalties(_nftFactoryAddress);
    }

    // MAIN FUNCTIONS
    function createAuction(uint _tokenId, uint _startingAmount, uint _durationInSeconds) external onlyNftOwner(_tokenId, msg.sender) {
        if (_startingAmount <= 0) {
            revert AmountMustBeAboveZero();
        }
        if (_durationInSeconds <= 0) {
            revert DurationMustBeAboveZero();
        }
        if (nftContract.getApproved(_tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }

        // Para crear una AUCTION, el nft no puede estar listado
        require(nftsInList[_tokenId] == false, "NFT is listed, can't create AUCTION, cancel the LIST before");

        // validate that NFT is NOT in auction
        require(nftsInAuction[_tokenId] == false, "NFT is already in AUCTION");

        // The duration in seconds is added to the current time to get the endTime
        auctions[_tokenId] = Auction(_tokenId, msg.sender, _startingAmount, 0, address(0), block.timestamp, block.timestamp + _durationInSeconds);
        nftsInAuction[_tokenId] = true; // nft is in Auction now
        emit AuctionCreated(_tokenId, msg.sender, _startingAmount, block.timestamp, block.timestamp + _durationInSeconds);
    }

    function addBidAmount(uint _tokenId) external payable {
        require(block.timestamp <= auctions[_tokenId].endTime, "Auction is closed");
        require(msg.value > auctions[_tokenId].startingAmount, "Bid should be higher than starting amount");
        require(msg.value > auctions[_tokenId].currentAmount, "Bid should be higher than current amount");

        // validate that NFT is in auction - I think is redundant but just in case
        require(nftsInAuction[_tokenId] == true, "NFT is NOT in AUCTION");

        // send back the money to the previous bidder - OJO with the first bid!!!!!!!!
        // first bid only adds money, does not return to anyone
        if (auctions[_tokenId].currentBuyer != address(0)) {
            (bool success, ) = auctions[_tokenId].currentBuyer.call{value: auctions[_tokenId].currentAmount}("");
            require(success, "Transfer failed");
        } 

        auctions[_tokenId].currentAmount = msg.value;
        auctions[_tokenId].currentBuyer = msg.sender;
        emit BidAdded(_tokenId, msg.value, msg.sender);
    }

    function claimAuction(uint _tokenId) external payable {
        require(block.timestamp > auctions[_tokenId].endTime, "Auction is still open");
        require(msg.sender == auctions[_tokenId].currentBuyer, "You are not the buyer"); // if there is no bid: buyer = 0x00 and no one can claim

        // validate that NFT is in auction - I think is redundant but just in case
        require(nftsInAuction[_tokenId] == true, "NFT is not in AUCTION");

        nftContract.transferFrom(auctions[_tokenId].seller, msg.sender, _tokenId); // sends NFT to buyer

        // manage royalties
        (address addressRoyalty, uint amountRoyalty) = nftContract.royaltyInfo(_tokenId, auctions[_tokenId].currentAmount);
        // console.log(addressRoyalty, amountRoyalty);

        // if seller = royalty owner, we do a single transaction
        if (addressRoyalty == auctions[_tokenId].seller) {
            (bool success, ) = auctions[_tokenId].seller.call{value: auctions[_tokenId].currentAmount}("");
            require(success, "Only transfer failed");
        } else {
            (bool successRoyalty, ) = addressRoyalty.call{value: amountRoyalty}("");
            require(successRoyalty, "Royalty transfer failed");

            (bool success, ) = auctions[_tokenId].seller.call{value: auctions[_tokenId].currentAmount - amountRoyalty}("");
            require(success, "Seller transfer failed");
        }

        emit AuctionClaimed(_tokenId, auctions[_tokenId].seller, msg.sender, auctions[_tokenId].currentAmount);

        auctions[_tokenId] = Auction(_tokenId, address(0), 0, 0, address(0), 0, 0);
        nftsInAuction[_tokenId] = false; // NFT is no longer in Auction
    }

    function cancelAuction(uint _tokenId) external onlyNftOwner(_tokenId, msg.sender) {
        // Cannot cancel after the auction has finished
        require(block.timestamp < auctions[_tokenId].endTime, "Auction already finished");
        // Only the seller can cancel the auction - redundant as the seller must be the NFT owner, but just in case
        require(auctions[_tokenId].seller == msg.sender, "You are not the seller");

        // validate that NFT is in auction - I think is redundant but just in case
        require(nftsInAuction[_tokenId] == true, "NFT is not in AUCTION");

        // send back the money to the current bidder (buyer)
        (bool success, ) = auctions[_tokenId].currentBuyer.call{value: auctions[_tokenId].currentAmount}("");
        require(success, "Transfer failed");

        emit AuctionCanceled(_tokenId, msg.sender);

        auctions[_tokenId] = Auction(_tokenId, address(0), 0, 0, address(0), 0, 0);
        nftsInAuction[_tokenId] = false; // nft is NOT IN AUCTION 
    }

    // LIST 
    function listItem(uint _tokenId, uint _amount, uint _durationInSeconds) external onlyNftOwner(_tokenId, msg.sender) {
        if (_amount <= 0) {
            revert AmountMustBeAboveZero();
        }
        if (nftContract.getApproved(_tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }

        // validate that NFT is NOT in auction
        require(nftsInAuction[_tokenId] == false, "NFT is in AUCTION, can't be listed, cancel AUCTION before LIST");

        listings[_tokenId] = Listing(_tokenId, msg.sender, _amount, block.timestamp, block.timestamp + _durationInSeconds);
        nftsInList[_tokenId] = true; // NFT is in list now
        emit ItemListed(_tokenId, msg.sender, _amount, block.timestamp, block.timestamp + _durationInSeconds);
    }

    function buyItem(uint _tokenId) external payable {
        require(msg.value >= listings[_tokenId].amount, "Amount not enough");
        require(block.timestamp <= listings[_tokenId].endTime, "Listing has ended");
        
        // validate that NFT is LISTED - I think is redundant but just in case
        require(nftsInList[_tokenId] == true, "NFT is not LISTED");

        nftContract.transferFrom(listings[_tokenId].seller, msg.sender, _tokenId); // sends NFT to buyer

        // manage royalties
        (address addressRoyalty, uint amountRoyalty) = nftContract.royaltyInfo(_tokenId, listings[_tokenId].amount);
        // console.log(addressRoyalty, amountRoyalty);

        // if seller = royalty owner, we do a single transaction
        if (addressRoyalty == listings[_tokenId].seller) {
            (bool success, ) = listings[_tokenId].seller.call{value: listings[_tokenId].amount}("");
            require(success, "Only transfer failed");
        } else {
            (bool successRoyalty, ) = addressRoyalty.call{value: amountRoyalty}("");
            require(successRoyalty, "Royalty transfer failed");

            (bool success, ) = listings[_tokenId].seller.call{value: listings[_tokenId].amount - amountRoyalty}("");
            require(success, "Seller transfer failed");
        }

        emit ItemBought(_tokenId, listings[_tokenId].seller, msg.sender, listings[_tokenId].amount);
        listings[_tokenId] = Listing(_tokenId, address(0), 0, 0, 0);
        nftsInList[_tokenId] = false; // NFT is no longer listed
    }
    
    function cancelList(uint _tokenId) onlyNftOwner(_tokenId, msg.sender) external {
        // Only the seller can cancel the auction - redundant as the seller must be the NFT owner, but just in case
        require(listings[_tokenId].seller == msg.sender, "You are not the seller");
        
        emit ItemListCanceled(_tokenId, msg.sender);
        listings[_tokenId] = Listing(_tokenId, address(0), 0, 0, 0);
        nftsInList[_tokenId] = false; // NFT is no longer listed
    }

    // OFFER - allows to create over an existing offer, as long as the amount is higher
    function createOffer(uint _tokenId, uint _durationInSeconds) external payable {
        // Previous offer is still in place
        if (block.timestamp <= offers[_tokenId].endTime) {
            // require that the offer is higher
            require(msg.value > offers[_tokenId].amount, "Previous offer is higher");
        }

        offers[_tokenId] = Offer(_tokenId, msg.sender, msg.value, block.timestamp, block.timestamp + _durationInSeconds);
        emit OfferCreated(_tokenId, msg.sender,  msg.value, block.timestamp, block.timestamp + _durationInSeconds);
    }

    function acceptOffer(uint _tokenId) external onlyNftOwner(_tokenId, msg.sender) {
        require(offers[_tokenId].amount > 0, "No offer made");
        require(block.timestamp <= offers[_tokenId].endTime, "Offer has ended");
        if (nftContract.getApproved(_tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }

        // validate that NFT is NOT in auction
        require(nftsInAuction[_tokenId] == false, "NFT is in AUCTION, can't accept offer");

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

    function cancelOffer(uint _tokenId) external {
        // Only the current offer owner can cancel
        require(offers[_tokenId].buyer == msg.sender, "You are not the current offer buyer");

        // send money back to buyer (msg.sender)
        (bool success, ) = offers[_tokenId].buyer.call{value: offers[_tokenId].amount}("");
        require(success, "Transfer failed");

        emit OfferCanceled(_tokenId, msg.sender);
        offers[_tokenId] = Offer(_tokenId, address(0), 0, 0, 0);
    }


    // Other functions
    function isTokenIdAllowed(uint _tokenId) external view returns(bool) {
        return nftContract.getApproved(_tokenId) == address(this);
    }

    // get functions
    function getNftFactoryAddress() external view returns(address) {
        return i_nft_factory_address;
    }  

    function getAuction(uint256 _tokenId) external view returns(Auction memory) {
        return auctions[_tokenId];
    }  

    function getListing(uint256 _tokenId) external view returns(Listing memory) {
        return listings[_tokenId];
    }  

    function getOffer(uint256 _tokenId) external view returns(Offer memory) {
        return offers[_tokenId];
    }  

    function getNftsInAution(uint256 _tokenId) external view returns(bool) {
        return nftsInAuction[_tokenId];
    } 

    function getNftsInList(uint256 _tokenId) external view returns(bool) {
        return nftsInList[_tokenId];
    }  

}