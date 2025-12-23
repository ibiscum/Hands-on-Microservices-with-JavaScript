import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    console.log('This action adds a new transaction');
    return this.prisma.transaction.create({
      data: {
        description: createTransactionDto.description,
        accountId: createTransactionDto.accountId,
        status: createTransactionDto.status,
      },
    });
  }

  findAll() {
    console.log('This action returns all transactions');
    return this.prisma.transaction.findMany();
  }

  findOne(id: number) {
    console.log(`This action returns a #${id} transaction`);
    return this.prisma.transaction.findUnique({
      where: { id: id },
    });
  }

  remove(id: number) {
    console.log(`This action removes a #${id} transaction`);
    return this.prisma.transaction.delete({
      where: { id: id },
    });
  }
}
