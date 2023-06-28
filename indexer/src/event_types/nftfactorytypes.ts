export interface NFTCreatedEvent{
    blockNumber: number;
    args:eventargs;
}

type eventargs={
    creator:string;
    tokenId:number;
    tokenUri:string;
    feeNumerator: number;
}