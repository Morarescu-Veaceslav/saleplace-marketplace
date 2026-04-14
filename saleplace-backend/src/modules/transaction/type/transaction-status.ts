import { TransactionStatus as PrismaTransactionStatus } from '@prisma/generated';
import { registerEnumType } from '@nestjs/graphql';

export const TransactionStatus = PrismaTransactionStatus;

registerEnumType(TransactionStatus, {
  name: 'TransactionStatus',
  description: 'Transaction status enum',
});

export type TransactionStatusEnum = PrismaTransactionStatus;