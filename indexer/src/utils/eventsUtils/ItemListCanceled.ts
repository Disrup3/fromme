import { ItemListCanceledEvent } from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";
export const ItemListCanceled = async (event:ItemListCanceledEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        seller: event.args.seller,
    };
    console.log(eventData);
    await callApi("ItemListCanceled", eventData);
  };