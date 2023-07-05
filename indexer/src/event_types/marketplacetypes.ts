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

export interface BetAddedEvent {
    blockNumber: number;
    args: eventargsBetAdded;
}

type eventargsBetAdded = {
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