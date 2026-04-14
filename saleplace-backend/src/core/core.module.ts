import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IS_DEV_ENV } from 'src/shared/utils/is-dev.util';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { getGraphQLConfig } from './config/graphql.config';
import { RedisModule } from './redis/redis.module';
import { MailModule } from 'src/modules/libs/mail/mail.module';
import { BullMQModule } from './bullmq/bullmq.module';
import { EventbusModule } from './eventbus/eventbus.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { StripeModule } from 'src/modules/libs/stripe/stripe.module';
import { getStripeConfig } from './config/stripe.config';
import { RedisService } from './redis/redis.service';
import { PresenceService } from 'src/modules/chat/presence.service';
import { PresenceModule } from 'src/modules/chat/presence.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true
    }),
    RedisModule,
    PresenceModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule, PresenceModule, RedisModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService, RedisService, PresenceService]
    }),
    StripeModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getStripeConfig,
      inject: [ConfigService]
    }),
    PrismaModule,
    MailModule,
    BullMQModule,
    EventbusModule,
    PubSubModule
  ],
  exports: [
    PrismaModule,
    RedisModule,
    MailModule,
    BullMQModule,
    EventbusModule,
    PubSubModule
  ]
})
export class CoreModule { }
