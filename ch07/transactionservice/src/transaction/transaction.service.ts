import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { HttpService } from "@nestjs/axios";
import { AccountApiResponse } from "./dto/account.dto.js";
import { KafkaService } from "../kafka/kafka.service.js";

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly kafkaService: KafkaService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    console.log("This action adds a new transaction");
    const { accountId, description } = createTransactionDto;
    const accountApiResponse = await this.httpService.axiosRef.get<AccountApiResponse>(
      `http://localhost:3001/v1/accounts/${accountId}`,
    );
    const { account } = accountApiResponse.data;
    if (!account) {
      throw new Error("Transaction creation failed: Account not found");
    }

    if (account.status == "new" || account.status == "active") {
      return this.prisma.transaction.create({
        data: { accountId, description, status: "CREATED" },
      });
    } else {
      return this.prisma.transaction.create({
        data: { accountId, description, status: "FAILED" },
      });
    }
  }

  findAll() {
    console.log(`This action returns all transaction`);
    return this.prisma.transaction.findMany();
  }

  findOne(id: number) {
    console.log(`This action returns a #${id} transaction`);

    return this.prisma.transaction.findUnique({ where: { id: id } });
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  //newly added functionality
  async fraud(id: number) {
    const transaction = await this.findOne(id);
    if (!transaction) {
      throw new Error("Transaction ID not found");
    }

    if (transaction.status !== "FRAUD" && transaction.status !== "FAILED") {
      const newTransaction = this.prisma.transaction.update({
        where: { id: id },
        data: { status: "FRAUD" },
      });
      await this.kafkaService.send(transaction);
      return newTransaction;
    } else throw new Error("Transaction is not in a valid status");
  }
}
