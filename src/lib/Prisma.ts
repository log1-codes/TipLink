// import { PrismaClient } from "@prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { neon } from "@neondatabase/serverless";

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL environment variable is not set");
// }

// const sql = neon(process.env.DATABASE_URL);
// const adapter = new PrismaNeon(sql as any);

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({ adapter });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }


import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };