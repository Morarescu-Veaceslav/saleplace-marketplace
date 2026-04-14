import { ObjectType, Field } from '@nestjs/graphql';
import { TransactionStatus, TransactionStatusEnum } from '../type/transaction-status';

@ObjectType()
export class TransactionListItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  orderId: string;

  @Field(() => String)
  productTitle: string;

  @Field(() => Number)
  amount: number

  @Field(() => String)
  currency: string;

  @Field(() => TransactionStatus)
  status: TransactionStatusEnum;

  @Field(() => String)
  viewerRole: string;

  @Field(() => String)
  counterpartyId: string;

  @Field(() => String)
  counterpartyUsername: string;

  @Field(() => Date)
  createdAt: Date;

}