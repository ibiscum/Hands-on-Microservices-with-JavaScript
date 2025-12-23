import dotenv from "dotenv";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = process.env.DATABASE_URL as string;
    console.log("Connecting to database: ", connectionString);

    const adapter = new PrismaPg({
      connectionString: connectionString,
    });
    super({ adapter });
  }
}
