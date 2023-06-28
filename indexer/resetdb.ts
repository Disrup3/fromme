import { prisma } from "./src/db";

const resetDb = async () => {
  console.info("Resetting database...");
  await prisma.tracker_State.deleteMany();
  await prisma.dead_events_queue.deleteMany()
};

resetDb()
  .then(() => {
    console.log("db cleared succesfully");
  })
  .catch((e) => {
    console.log(e);
  });
