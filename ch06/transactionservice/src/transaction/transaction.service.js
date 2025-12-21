import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
@Injectable()
export class TransactionService {
    create(createTransactionDto) {
        return 'This action adds a new transaction';
    }
    findAll() {
        return `This action returns all transaction`;
    }
    findOne(id) {
        return `This action returns a #${id} transaction`;
    }
    update(id, updateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }
    remove(id) {
        return `This action removes a #${id} transaction`;
    }
}
//# sourceMappingURL=transaction.service.js.map