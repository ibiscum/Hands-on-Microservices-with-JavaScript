import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service.js";
import { TransactionController } from "./transaction.controller.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { HttpModule } from "@nestjs/axios";
import { KafkaService } from "../kafka/kafka.service.js";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [TransactionController],
  providers: [TransactionService, KafkaService, ConfigService],
  // providers: [TransactionService],
})
export class TransactionModule {}
