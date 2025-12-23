import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';

enum Status {
  CREATED = 'CREATED',
  SETTLED = 'SETTLED',
  FAILED = 'FAILED',
}

export class CreateTransactionDto {
  @IsNotEmpty()
  status: Status;
  @IsUUID()
  @IsNotEmpty()
  accountId: string;
  @IsOptional()
  @IsString()
  description?: string;
}
