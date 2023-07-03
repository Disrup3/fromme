// copiar la siguiente logica para los diferentes evento
import { AuctionClaimedEvent } from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";
export const AuctionClaimed = async (event:AuctionClaimedEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        seller: event.args.seller,
        buyer: event.args.buyer,
        finalAmount: Number(event.args.finalAmount)
    };
    console.log(eventData);
    await callApi("AuctionClaimed", eventData);
  };