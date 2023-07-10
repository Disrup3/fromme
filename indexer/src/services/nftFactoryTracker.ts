import { NFTCreatedEvent } from "../event_types/nftfactorytypes";
import { ethers } from "ethers";
import {nftFactoryContract} from "../constants/contractsData";
import { callApi } from "../utils/apiUtils";
import { PrismaClient } from "../client/generate";


const provider = new ethers.providers.JsonRpcProvider(
  //utilizar variables de entorno posteriormente
  process.env.MUMBAI_RPC_PROVIDER ?? "http://127.0.0.1:8545/"
);

const loadMarketplaceContract = () => {
  const abi = nftFactoryContract.abi;
  const address = nftFactoryContract.address;
  return new ethers.Contract(address, abi, provider);
};


export const processFactoryTrackerEvents = async (startFromBlock:number, prisma:PrismaClient) => {
    const currentBlock = await provider.getBlockNumber();
    const marketplaceSC = loadMarketplaceContract();
    let lastBlockProcessed = startFromBlock;
  
    console.info(
      `Processing events from block ${startFromBlock} to ${currentBlock}`
    );
  
    const handleMarketplaceEvents = async (events:NFTCreatedEvent[]) => {
      // logic for handling paymentEvents
      for (const event of events) {
          NFTCreated(event);
        // TODO: check evento de itemcancel
        lastBlockProcessed = event.blockNumber + 1;
      }
    };
  
    try {
      const pastEvents = await marketplaceSC.queryFilter(
        "NFTCreated",
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
          await prisma.tracker_State.updateMany({
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

const NFTCreated = async (event:NFTCreatedEvent) => {
    console.log(event.blockNumber, "blockNumber");
    const eventData = {
      creator: event.args.creator,
      feeNumerator: Number(event.args.feeNumerator),
      tokenId: Number(event.args.tokenId),
      tokenUri: event.args.tokenUri,
    };
    console.log(eventData);
    await callApi("nftCreated", eventData);
  };