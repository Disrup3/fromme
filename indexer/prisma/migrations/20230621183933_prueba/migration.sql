-- CreateTable
CREATE TABLE "Tracker_State" (
    "contractAddress" TEXT NOT NULL PRIMARY KEY,
    "lastBlockProcessed" INTEGER NOT NULL,
    "chainId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dead_events_queue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventName" TEXT NOT NULL,
    "data" TEXT NOT NULL
);
