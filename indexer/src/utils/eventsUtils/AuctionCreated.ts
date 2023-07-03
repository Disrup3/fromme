import { AunctionCreatedEvent } from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";
//Typo en el nombre del evento en el contrato, pendiente arreglarlo
export const AunctionCreated = async (event:AunctionCreatedEvent) => {
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