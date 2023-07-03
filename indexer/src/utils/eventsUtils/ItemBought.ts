import { ItemBoughtEvent} from "../../event_types/marketplacetypes";
import { callApi } from "../apiUtils";
export const ItemBought = async (event:ItemBoughtEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        seller: event.args.seller,
        buyer: event.args.buyer,
        amount: Number(event.args.amount)
    };
    console.log(eventData);
    await callApi("ItemBought", eventData);
  };