import { NFTCreatedEvent } from "../event_types/nftfactorytypes";
import { ethers } from "ethers";
import {nftFactoryContract} from "../constants/contractsData";
import { frommeMarketplaceContract } from "../constants/contractsData";
import { callApi } from "../utils/apiUtils";
import { PrismaClient } from "../client/generate";
import { ItemListed } from "../utils/eventsUtils/itemListed";

const provider = new ethers.providers.JsonRpcProvider(
    //utilizar variables de entorno posteriormente
    process.env.MUMBAI_RPC_PROVIDER ?? "http://127.0.0.1:8545/"
  );

const loadMarketplaceContract = () => {
    const abi = frommeMarketplaceContract.abi;
    const address = frommeMarketplaceContract.address;
    return new ethers.Contract(address, abi, provider);
  };

export const processNftMarketplaceEvents = async (startFromBlock:number, prisma:PrismaClient) => {
    const currentBlock = await provider.getBlockNumber();
    const marketplaceSC = loadMarketplaceContract();
    let lastBlockProcessed = startFromBlock;
  
    console.info(
      `Processing events from block ${startFromBlock} to ${currentBlock}`
    );
  
    const handleMarketplaceEvents = async (events:any[]) => {
      // logic for handling paymentEvents
      for (const event of events) {
        if (event.event === "ItemListed" ) {
          ItemListed(event);} 
          /*
        if (event.event === "AunctionCreated") {
            AunctionCreated(event);
        } else if (event.event === "BetAdded") {
            BetAdded(event);
        } else if (event.event === "AuctionClaimed") {
            AuctionClaimed(event);
        } else if (event.event === "ItemListed") {
            ItemListed(event);
        } else if (event.event === "ItemBought") {
            ItemBought(event);
        } else if (event.event === "OfferCreated") {
            OfferCreated(event);
        } else if (event.event === "OfferAccepted") {
            OfferAccepted(event);
        } */
        // TODO: check evento de itemcancel
        lastBlockProcessed = event.blockNumber + 1;
      }
    };
  
    try {
      const pastEvents = await marketplaceSC.queryFilter(
        "*",
        startFromBlock,
        currentBlock
      );
      console.log(pastEvents.length, "events length");
  
      const batches = pastEvents.reduce((batchArray:any[], item:any, index:number) => {
        const chunkIndex = Math.floor(index / 10);
  
        if (!batchArray[chunkIndex]) {
          batchArray[chunkIndex] = []; // start a new chunk
        }
  
        batchArray[chunkIndex].push(item);
  
        return batchArray;
      }, []);
  
      batches.length && console.log(`Event batches to run ${batches.length}`);
      let runBatch = 0;
      await new Promise<void>((resolve) => {
        let interval = setInterval(async () => {
          if (runBatch >= batches.length) {
            clearInterval(interval);
            return resolve();
          }
  
          await handleMarketplaceEvents(batches[runBatch]);
          await prisma.tracker_State.update({
            where: {
              contractAddress: nftFactoryContract.address,
            },
            data: {
              lastBlockProcessed: lastBlockProcessed,
            },
          });
          console.log(
            `[PastEvents] Proccesed batch ${runBatch + 1} of ${batches.length}`
          );
          console.log(`[PastEvents] LastBlockProcessed: ${lastBlockProcessed}`);
  
          runBatch += 1;
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };
  /*
//Typo en el nombre del evento en el contrato, pendiente arreglarlo
const AunctionCreated = async (event:AunctionCreatedEvent) => {
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

const BetAdded = async (event:BetAddedEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        currentAmount: Number(event.args.seller),
        currentBuyer: event.args.currentBuyer
    };
    console.log(eventData);
    await callApi("BetAdded", eventData);
  };

const AuctionClaimed = async (event:AuctionClaimedEvent) => {
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



const ItemBought = async (event:ItemBoughtEvent) => {
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

const OfferCreated = async (event:OfferCreatedEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        buyer: event.args.buyer,
        amount: Number(event.args.amount),
        startingTime: Number(event.args.startingTime),
        endTime: Number(event.args.endTime)
    };
    console.log(eventData);
    await callApi("OfferCreated", eventData);
  };

const OfferAccepted = async (event:OfferAcceptedEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
        tokenId: Number(event.args.tokenId),
        seller: event.args.seller,
        buyer: event.args.buyer,
        amount: Number(event.args.amount),
    };
    console.log(eventData);
    await callApi("OfferAccepted", eventData);
  };
  */