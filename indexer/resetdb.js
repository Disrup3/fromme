const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const resetDb = async () => {
  console.info("Resetting database...");
  await prisma.Tracker_State.deleteMany();
};

resetDb()
  .then(() => {
    console.log("db cleared succesfully");
  })
  .catch((e) => {
    console.log(e);
  });