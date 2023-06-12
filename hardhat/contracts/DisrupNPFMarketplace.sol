// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Check out https://github.com/Fantom-foundation/Artion-Contracts/blob/5c90d2bc0401af6fb5abf35b860b762b31dfee02/contracts/FantomMarketplace.sol
// For a full decentralized nft marketplace

error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error ItemNotForSale(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NotOwner();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();

// TODO PERMITIR PAGOS EN ERC20
// TODO Implementar token registry
// TODO Implementar sistema de royalties por colección

contract NftMarketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address paytoken;
        uint256 price;
        address seller;
        uint256 listingId;
    }

    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address paytoken,
        uint256 price,
        uint listingId,
        uint timestamp
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint listingId,
        uint timestamp
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address paytoken,
        uint256 price,
        uint listingId,
        uint timestamp
    );

    // numeros en base 10000
    // 100 -> 1%
    uint256 public MarketplaceFee = 200;
    uint private currentListingId = 0;
    address payable public FeeRecipient;


    mapping(address => uint) public collectionRoyalties;
    //nftAddress -> tokenId -> Listing
    mapping(address => mapping(uint256 => Listing)) private listings;

    modifier notListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = listings[nftAddress][tokenId];
        if (listing.price > 0) {
            revert AlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = listings[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    constructor() {
        FeeRecipient = payable(msg.sender);
    }

    /////////////////////
    // Main Functions //
    /////////////////////
    /*
     * @notice Method for listing NFT
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     * @param price sale price for each item
     */
    function listItem(
        address nftAddress,
        address paytoken,
        uint256 tokenId,
        uint256 price
    )
        external
        notListed(nftAddress, tokenId)
        isOwner(nftAddress, tokenId, msg.sender)
    {
        if (price <= 0) {
            revert PriceMustBeAboveZero();
        }

        IERC721 nft = IERC721(nftAddress);
        if (nft.getApproved(tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }
        listings[nftAddress][tokenId] = Listing(paytoken, price, msg.sender, currentListingId);
        emit ItemListed(msg.sender, nftAddress, tokenId, paytoken, price, currentListingId, block.timestamp);
        currentListingId++;
    }

    /*
     * @notice Method for cancelling listing
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     */
    function cancelListing(
        address nftAddress,
        uint256 tokenId
    )
        external
        isOwner(nftAddress, tokenId, msg.sender)
        isListed(nftAddress, tokenId)
    {   
        Listing memory listing = listings[nftAddress][tokenId];
        delete (listings[nftAddress][tokenId]);
        emit ItemCanceled(msg.sender, nftAddress, tokenId, block.timestamp, listing.listingId);
    }

    /*
     * @notice Method for buying listing
     * @notice The owner of an NFT could unapprove the marketplace,
     * which would cause this function to fail
     * Ideally you'd also have a `createOffer` functionality.
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     */
    function buyItem(
        address nftAddress,
        uint256 tokenId
    )
        external
        payable
        isListed(nftAddress, tokenId)
        // isNotOwner(nftAddress, tokenId, msg.sender)
        nonReentrant
    {
        // Challenge - How would you refactor this contract to take:
        // 1. Abitrary tokens as payment? (HINT - Chainlink Price Feeds!)
        // 2. Be able to set prices in other currencies?
        // 3. Tweet me @PatrickAlphaC if you come up with a solution!
        Listing memory listedItem = listings[nftAddress][tokenId];

        uint royaltyFee = 0;
        uint collectionRoyaltyFee = 0;
        royaltyFee = (listedItem.price * MarketplaceFee) / 10000;

        if (collectionRoyalties[nftAddress] > 0) {
            collectionRoyaltyFee =
                (listedItem.price * collectionRoyalties[nftAddress]) /
                10000;
        }

        // compra a través de token nativo
        if (listedItem.paytoken == address(0)) {
            if (msg.value < listedItem.price) {
                revert PriceNotMet(nftAddress, tokenId, listedItem.price);
            }
            // pagamos fees al marketplace owner

            FeeRecipient.transfer(royaltyFee + collectionRoyaltyFee);

            payable(listedItem.seller).transfer(
                listedItem.price - royaltyFee - collectionRoyaltyFee
            );
        } else {
            IERC20(listedItem.paytoken).transferFrom(
                msg.sender,
                FeeRecipient,
                royaltyFee + collectionRoyaltyFee
            );

            IERC20(listedItem.paytoken).transferFrom(
                msg.sender,
                listedItem.seller,
                listedItem.price - royaltyFee - collectionRoyaltyFee
            );
        }
        Listing memory _listing = listings[nftAddress][tokenId];
        delete (listings[nftAddress][tokenId]);
        // payFees

        IERC721(nftAddress).safeTransferFrom(
            listedItem.seller,
            msg.sender,
            tokenId
        );
        emit ItemBought(
            msg.sender,
            nftAddress,
            tokenId,
            listedItem.paytoken,
            listedItem.price,
            _listing.listingId,
            block.timestamp
        );
    }

    /*
     * @notice Method for updating listing
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     * @param newPrice Price in Wei of the item
     */
    function updateListing(
        address nftAddress,
        address paytoken,
        uint256 tokenId,
        uint256 newPrice
    )
        external
        isListed(nftAddress, tokenId)
        nonReentrant
        isOwner(nftAddress, tokenId, msg.sender)
    {
        //We should check the value of `newPrice` and revert if it's below zero (like we also check in `listItem()`)
        if (newPrice <= 0) {
            revert PriceMustBeAboveZero();
        }
        Listing memory listing_ = listings[nftAddress][tokenId];
        listings[nftAddress][tokenId].price = newPrice;
        emit ItemListed(msg.sender, nftAddress, tokenId, paytoken, newPrice, listing_.listingId ,  block.timestamp);
    }

    function getListing(
        address nftAddress,
        uint256 tokenId
    ) external view returns (Listing memory) {
        return listings[nftAddress][tokenId];
    }

    function setMarketplaceFee(uint _newFee) external onlyOwner {
        MarketplaceFee = _newFee;
    }

    function setFeeRecipient(address _newRecipient) external onlyOwner {
        FeeRecipient = payable(_newRecipient);
    }
}