import { BidAddedEvent } from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";
export const BidAdded = async (event:BidAddedEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        currentAmount: Number(event.args.currentAmount),
        currentBuyer: event.args.currentBuyer
    };
    console.log(eventData); 
    await callApi("BidAdded", eventData);
  };