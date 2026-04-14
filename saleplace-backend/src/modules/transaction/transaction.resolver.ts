import { Args, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { User } from '@prisma/generated';
import { TransactionsPaginationInput } from './input/transaction-pagination';
import { TransactionsListResponse } from './model/transaction-list';

@Resolver('Transaction')
export class TransactionResolver {
  public constructor(private readonly transactionService: TransactionService) { }

  @Authorization()
  @Query(() => TransactionsListResponse, { name: 'transactionsList' })
  async sellerTransactions(
    @Authorized() user: User,
    @Args('pagination', { nullable: true })
    pagination?: TransactionsPaginationInput,
  ): Promise<TransactionsListResponse> {
    return this.transactionService.getTransactions(user.id, pagination);
  }
}
