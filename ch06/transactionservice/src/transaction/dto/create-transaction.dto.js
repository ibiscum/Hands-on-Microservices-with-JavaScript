import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
export class CreateTransactionDto {
    @IsUUID()
    @IsNotEmpty()
    accountId;
    @IsOptional()
    @IsString()
    description;
}
//# sourceMappingURL=create-transaction.dto.js.map