import { TransactionService } from './transaction.service.js';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto): Promise<any>;
    findAll(): any;
    findOne(id: string): any;
}
//# sourceMappingURL=transaction.controller.d.ts.map