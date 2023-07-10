import { OfferCreatedEvent } from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";
export const OfferCreated = async (event:OfferCreatedEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        buyer: event.args.buyer,
        amount: Number(event.args.amount),
        startingTime: Number(event.args.startingTime),
        endTime: Number(event.args.endTime)
    };
    console.log(eventData);
    await callApi("OfferCreated", eventData);
  };