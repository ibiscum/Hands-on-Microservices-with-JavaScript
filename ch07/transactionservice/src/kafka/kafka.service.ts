import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly producer: Producer;
  private readonly topic: string;

  constructor(private configService: ConfigService) {
    const clientId = process.env.KAFKA_CLIENT_ID;
    const brokers = (process.env.KAFKA_BROKERS ?? "localhost:29092").split(",");
    console.log(brokers);
    // const brokers = ["localhost:29092"];
    this.topic = process.env.KAFKA_TOPIC as string;
    const kafka = new Kafka({ clientId, brokers });
    this.producer = kafka.producer({ retry: { retries: 3 } });
  }

  async onModuleInit(): Promise<void> {
    await this.producer.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer.disconnect();
  }

  async send(value: any, key?: string): Promise<void> {
    const messages = [{ key, value: JSON.stringify(value) }];
    await this.producer.send({ topic: this.topic, messages });
  }
}
