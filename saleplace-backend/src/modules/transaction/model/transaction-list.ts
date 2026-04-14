import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TransactionListItem } from './transaction.model';
import { TransactionsPagination } from './transaction-pagination';

@ObjectType()
export class TransactionsListResponse {
  @Field(() => [TransactionListItem])
  items: TransactionListItem[]

  @Field(() => TransactionsPagination)
  pagination: TransactionsPagination
}