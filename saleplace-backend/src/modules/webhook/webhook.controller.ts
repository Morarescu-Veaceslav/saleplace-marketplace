import {
  Controller,
  Post,
  Req,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) { }

  @Post('stripe')
  @HttpCode(200)
  async handleStripeWebhook(
    @Req() req: any,
    @Headers('stripe-signature') signature: string,
  ) {

    const event = this.webhookService.constructStripeEvent(
      req.rawBody,
      signature,
    );

    await this.webhookService.handleStripeEvent(event);

    return { received: true };
  }
}
