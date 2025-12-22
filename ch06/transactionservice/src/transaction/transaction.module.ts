import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service.js';
import { TransactionController } from './transaction.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [PrismaModule, HttpModule],
})
export class TransactionModule {}
