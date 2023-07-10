export interface AuctionCreatedEvent {
    blockNumber: number;
    args: eventargsAuctionCreated;
}

type eventargsAuctionCreated = {
    tokenId: number;
    seller: string;
    startingAmount: number;
    startingTime: number;
    endTime: number;
}

export interface BidAddedEvent {
    blockNumber: number;
    args: eventargsBidAdded;
}

type eventargsBidAdded = {
    tokenId: number;
    currentAmount: number;
    currentBuyer: string;
}

export interface AuctionClaimedEvent {
    blockNumber: number;
    args: eventargsAuctionClaimed;
}

type eventargsAuctionClaimed = {
    tokenId: number;
    seller:string;
    buyer: string;
    finalAmount: number;
}

export interface ItemListedEvent {
    blockNumber: number;
    args: eventargsItemListed;
}

type eventargsItemListed = {
    tokenId: number;
    seller: string;
    amount: number;
    startingTime: number;
    endTime: number;
}

export interface ItemBoughtEvent {
    blockNumber: number;
    args: eventargsItemBought;
}

type eventargsItemBought = {
    tokenId: number;
    seller: string;
    buyer: string;
    amount: number;
}

export interface OfferCreatedEvent {
    blockNumber: number;
    args: eventargsOfferCreated;
}

type eventargsOfferCreated = {
    tokenId: number;
    buyer: string;
    amount: number;
    startingTime: number;
    endTime: number;
}

export interface OfferAcceptedEvent {
    blockNumber: number;
    args: eventargsOfferAccepted;
}

type eventargsOfferAccepted = {
    tokenId: number;
    seller: string;
    buyer: string;
    amount: number;
}

export interface AuctionCanceledEvent {
    blockNumber: number;
    args: eventargsAuctionCanceled;
}

type eventargsAuctionCanceled = {
    tokenId: number;
    seller: string;
}

export interface ItemListCanceledEvent {
    blockNumber: number;
    args: eventargsItemListCanceled;
}

type eventargsItemListCanceled = {
    tokenId: number;
    seller: string;
}

export interface OfferCanceledEvent {
    blockNumber: number;
    args: eventargsOfferCanceled;
}

type eventargsOfferCanceled = {
    tokenId: number;
    seller: string;
}