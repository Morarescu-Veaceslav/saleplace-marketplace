import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CoreModule } from "./core/core.module";
import { PasswordRecoveryModule } from "./modules/auth/password-recovery/password-recovery.module";
import { AccountModule } from "./modules/auth/account/account.module";
import { SessionModule } from "./modules/auth/session/session.module";
import { VerificationModule } from "./modules/auth/verification/verification.module";
import { TotpModule } from './modules/auth/totp/totp.module';
import { DeactivateModule } from './modules/auth/deactivate/deactivate.module';
import { AccountDeletionModule } from './modules/auth/account-deletion/account-deletion.module';
import { StorageModule } from './modules/libs/storage/storage.module';
import { ProfileModule } from './modules/auth/profile/profile.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ProductImagesModule } from './modules/product-images/product-images.module';
import { VisitorIdMiddleware } from "./common/middleware/visitor-id.middleware";
import { ReviewModule } from './modules/review/review.module';
import { FollowModule } from './modules/follow/follow.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ChatModule } from './modules/chat/chat.module';
import { StripeModule } from './modules/libs/stripe/stripe.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { EmailModule } from './modules/email/email.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { UploadModule } from './modules/upload/upload.module';


@Module({
    imports: [
        CoreModule,
        AccountModule,
        SessionModule,
        VerificationModule,
        PasswordRecoveryModule,
        TotpModule,
        DeactivateModule,
        AccountDeletionModule,
        StorageModule,
        ProfileModule,
        CategoryModule,
        ProductModule,
        ProductImagesModule,
        ReviewModule,
        FollowModule,
        NotificationsModule,
        ChatModule,
        StripeModule,
        WebhookModule,
        CheckoutModule,
        EmailModule,
        TransactionModule,
        SubscriptionModule,
        UploadModule,
    ],
})
export class AppModule  implements NestModule{ 
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(VisitorIdMiddleware).forRoutes('graphql')
    }
}
