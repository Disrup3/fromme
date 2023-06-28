// copiar la siguiente logica para los diferentes eventos

import { NFTCreatedEvent } from "../../event_types/nftfactorytypes";
import { callApi } from "../apiUtils";

export const NFTCreated = async (event:NFTCreatedEvent) => {
    const eventData = {
      creator: event.args.creator,
      feeNumerator: Number(event.args.feeNumerator),
      tokenId: Number(event.args.tokenId),
      tokenUri: event.args.tokenUri,
    };
    await callApi("nftCreated", eventData);
  };