import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service.js';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
@Controller('transaction')
export class TransactionController {
    transactionService;
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    @Post()
    create(
    @Body()
    createTransactionDto) {
        return this.transactionService.create(createTransactionDto);
    }
    @Get()
    findAll() {
        return this.transactionService.findAll();
    }
    @Get(':id')
    findOne(
    @Param('id')
    id) {
        return this.transactionService.findOne(+id);
    }
}
//# sourceMappingURL=transaction.controller.js.map