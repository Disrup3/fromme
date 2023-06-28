import { PrismaClient } from "./client/generate";

const globalForPrisma = globalThis as unknown as {
prisma: PrismaClient | undefined;
};

export const prisma =
globalForPrisma.prisma ??
new PrismaClient({
});