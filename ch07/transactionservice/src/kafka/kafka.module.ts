import { Module } from "@nestjs/common";
import { KafkaService } from "./kafka.service.js";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [KafkaService],
})
export class KafkaModule {}
