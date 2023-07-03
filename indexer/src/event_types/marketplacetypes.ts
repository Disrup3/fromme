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