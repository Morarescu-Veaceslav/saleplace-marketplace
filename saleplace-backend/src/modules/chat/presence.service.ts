import { Inject, Injectable } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { PresenceSocket } from "src/core/config/type/PresenceSocket.type";
import { PUB_SUB } from "src/core/pubsub/pubsub.constants";
import { RedisService } from "src/core/redis/redis.service";

@Injectable()
export class PresenceService {
  private onlineUsers = new Map<string, Set<any>>(); // doar pentru WebSocket connections
  private ONLINE_USERS_KEY = "online_users";

  constructor(
    @Inject(PUB_SUB)
    public readonly pubSub: PubSub,
    private readonly redisService: RedisService
  ) { }

  getConnections(userId: string): Set<any> | undefined {
    return this.onlineUsers.get(userId);
  }

  async markOnline(userId: string) {
    await this.redisService.client.sadd(this.ONLINE_USERS_KEY, userId);
  }

  async markOffline(userId: string) {
    await this.redisService.client.srem(this.ONLINE_USERS_KEY, userId);
  }

  async getOnlineUsers(): Promise<Set<string>> {
    const users = await this.redisService.client.smembers(this.ONLINE_USERS_KEY);
    return new Set(users);
  }

  async isOnline(userId: string): Promise<boolean> {
    const result = await this.redisService.client.sismember(
      this.ONLINE_USERS_KEY,
      userId
    );
    return result === 1;
  }
}