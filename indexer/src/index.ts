require("dotenv").config();
import { Dead_events_queue } from "./client/generate";
import { nftFactoryContract } from "./constants/contractsData";
import { prisma } from "./db"
import { processFactoryTrackerEvents } from "./services/nftFactoryTracker";
import { processNftMarketplaceEvents } from "./services/nftMarketplaceTracker";
import { callApi } from "./utils/apiUtils";


const CHAIN_ID = process.env.NETWORK_CHAINID ?? "80001";

const connect = async () => {
  // Check last block processed;
  const result = await prisma.tracker_State.findMany();
  if (!result.length) {
    await prisma.tracker_State.create({
      data: {
        contractAddress: nftFactoryContract.address,
        lastBlockProcessed: 0,
        chainId: CHAIN_ID,
      },
    });
  }

  const trackContractCallback = async () => {
    const lastBlocks = await prisma.tracker_State.findMany();
    await processNftMarketplaceEvents(lastBlocks[0].lastBlockProcessed, prisma);
    await processFactoryTrackerEvents(lastBlocks[0].lastBlockProcessed, prisma);
    await processDeadEvents();
    setTimeout(() => trackContractCallback(), 2000); // Recursividad de trackeo
  };
  await trackContractCallback();
};

const processDeadEvents = async () => {
  // checkear si hay eventos muertos
  const deadEvents = await prisma.dead_events_queue.findMany();

  if(!deadEvents.length) return console.log("No hay que recuperar");
  // de ser asi, llamar a callApi con esos datos
  try {
    deadEvents.forEach(async (event: Dead_events_queue) => {
      console.log(event.eventName)
      const success = await callApi(event.eventName, JSON.parse(event.data), true);
      if(success) await prisma.dead_events_queue.delete({where: {id: event.id}})
    });
  } catch (error) {
    console.log(error);
  }
};

setTimeout(connect, 2000); // Para que el turbo repo no pete