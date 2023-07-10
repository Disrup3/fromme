import { OfferCanceledEvent } from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";
export const OfferCanceled = async (event:OfferCanceledEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        seller: event.args.seller,
    };
    console.log(eventData);
    await callApi("OfferCanceled", eventData);
  };