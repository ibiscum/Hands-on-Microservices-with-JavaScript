import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
export declare class TransactionService {
    private readonly prisma;
    private readonly httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    create(createTransactionDto: CreateTransactionDto): Promise<any>;
    findAll(): any;
    findOne(id: number): any;
}
//# sourceMappingURL=transaction.service.d.ts.map