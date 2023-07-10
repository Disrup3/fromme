import { AuctionCanceledEvent } from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";
//Typo en el nombre del evento en el contrato, pendiente arreglarlo
export const AuctionCanceled = async (event:AuctionCanceledEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        seller: event.args.seller,
    };
    console.log(eventData);
    await callApi("AuctionCanceled", eventData);
  };