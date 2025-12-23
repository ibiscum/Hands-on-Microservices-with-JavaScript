import { Module } from "@nestjs/common";
import { KafkaService } from "./kafka.service.js";
import { ConfigModule } from "@nestjs/config";

@Module({
  providers: [KafkaService],
  imports: [ConfigModule],
})
export class KafkaModule {}
