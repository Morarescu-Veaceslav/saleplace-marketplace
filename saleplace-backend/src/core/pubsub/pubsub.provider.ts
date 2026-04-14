import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from './pubsub.constants';
import { RedisService } from '../redis/redis.service';

export const PubSubProvider = {
  provide: PUB_SUB,
  inject: [RedisService],
  useFactory: (redisService: RedisService) => {
    return new RedisPubSub({
      publisher: redisService.client,
      subscriber: redisService.client.duplicate(),
    });
  },
};
