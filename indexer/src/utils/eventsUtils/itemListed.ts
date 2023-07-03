// copiar la siguiente logica para los diferentes eventos

import { ItemListedEvent } from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";

export const ItemListed = async (event:ItemListedEvent) => {
  console.log(event.blockNumber, "blockNumber");
  const eventData = {
      tokenId: Number(event.args.tokenId),
      seller: event.args.seller,
      amount: Number(event.args.amount),
      startingTime: Number(event.args.startingTime),
      endTime: Number(event.args.endTime)
  };
  console.log(eventData);
  await callApi("ItemListed", eventData);
};