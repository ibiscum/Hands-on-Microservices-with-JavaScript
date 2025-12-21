import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
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
    @Patch(':id')
    update(
    @Param('id')
    id, 
    @Body()
    updateTransactionDto) {
        return this.transactionService.update(+id, updateTransactionDto);
    }
    @Delete(':id')
    remove(
    @Param('id')
    id) {
        return this.transactionService.remove(+id);
    }
}
//# sourceMappingURL=transaction.controller.js.map