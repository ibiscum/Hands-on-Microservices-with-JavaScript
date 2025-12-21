import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service.js';
import { TransactionController } from './transaction.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HttpModule } from '@nestjs/axios';
@Module({
    imports: [PrismaModule, HttpModule],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {
}
//# sourceMappingURL=transaction.module.js.map