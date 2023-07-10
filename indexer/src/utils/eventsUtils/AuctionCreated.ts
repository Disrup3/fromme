import { AuctionCreatedEvent } from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";
export const AuctionCreated = async (event:AuctionCreatedEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        seller: event.args.seller,
        startingAmount: Number(event.args.startingAmount),
        startingTime: Number(event.args.startingTime),
        endTime: Number(event.args.endTime),
    };
    console.log(eventData);
    await callApi("AuctionCreated", eventData);
  };