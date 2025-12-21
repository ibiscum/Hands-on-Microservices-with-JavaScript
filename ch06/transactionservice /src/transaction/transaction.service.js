import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { PrismaService } from "../prisma/prisma.service";
import { HttpService } from '@nestjs/axios';
import { AccountApiResponse } from './dto/account.dto.js';
@Injectable()
export class TransactionService {
    prisma;
    httpService;
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
    }
    async create(createTransactionDto) {
        const { accountId, description } = createTransactionDto;
        let accountApiResponse = await this.httpService.axiosRef.get(`http://localhost:3001/v1/accounts/${createTransactionDto.accountId}`);
        const { account } = accountApiResponse.data;
        if (!account) {
            throw new Error('Transaction creation failed: Account not found');
        }
        if (account.status == 'new' || account.status == 'active') {
            return this.prisma.transaction.create({
                data: { accountId, description, status: 'CREATED' },
            });
        }
        else {
            return this.prisma.transaction.create({
                data: { accountId, description, status: 'FAILED' },
            });
        }
    }
    findAll() {
        return this.prisma.transaction.findMany();
    }
    findOne(id) {
        return this.prisma.transaction.findUnique({
            where: { id },
        });
    }
}
//# sourceMappingURL=transaction.service.js.map