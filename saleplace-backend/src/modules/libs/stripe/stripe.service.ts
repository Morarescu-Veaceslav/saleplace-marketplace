import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeOptionsSymbol, TypeStripeOptions } from './types/stripe.type';

@Injectable()
export class StripeService {
    public readonly client: Stripe

    constructor(
        @Inject(StripeOptionsSymbol)
        options: TypeStripeOptions,
    ) {
        this.client = new Stripe(options.apiKey, options.config);
    }
}
