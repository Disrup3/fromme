// copiar la siguiente logica para los diferentes eventos

import { ItemListedEvent } from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";

export const ItemListed = async (event: ItemListedEvent) => {
    const eventData = {
      tokenId: event.args.tokenId,
      seller: event.args.seller,
      amount: event.args.amount,
      startingTime: event.args.startingTime,
      endTime: event.args.endTime,
    };
    await callApi("ItemListed", eventData);
  };