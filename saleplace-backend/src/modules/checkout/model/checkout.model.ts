import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CheckoutResponse {
  @Field()
  checkoutUrl: string;
}
