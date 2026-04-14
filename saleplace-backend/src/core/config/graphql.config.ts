import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { isDev } from "src/shared/utils/is-dev.util";
import { PresenceService } from "src/modules/chat/presence.service";
import { RedisService } from "../redis/redis.service";

export function getGraphQLConfig(
    configService: ConfigService,
    redisService: RedisService,
    presenceService: PresenceService,
): ApolloDriverConfig {
    return {
        driver: ApolloDriver,
        playground: isDev(configService),
        path: configService.getOrThrow<string>("GRAPHQL_PREFIX"),
        autoSchemaFile: join(process.cwd(), "src/core/graphql/schema.gql"),
        sortSchema: true,

        subscriptions: {
            "graphql-ws": {

                onConnect: async (context: any) => {
                    const cookieHeader = context.extra.request.headers.cookie;
                    if (!cookieHeader) return {};

                    const cookies = parseCookies(cookieHeader);
                    const rawSession = cookies["session"];
                    if (!rawSession) return {};

                    const sessionId = rawSession.replace(/^s:/, "").split(".")[0];
                    const redisKey = configService.getOrThrow<string>("SESSION_FOLDER") + sessionId;
                    const sessionJSON = await redisService.client.get(redisKey);
                    if (!sessionJSON) return {};

                    const session = JSON.parse(sessionJSON);
                    const userId = session?.userId;
                    if (!userId) return {};

                    context.extra.socket.userId = userId;

                    // ✅ marcăm userul ca fiind online în Redis
                    await presenceService.markOnline(userId);

                    return { userId };
                },

                // onSubscribe: async (context: any, msg: any) => {

                //     console.log("🔟 onSubscribe triggered");

                //     const socket = context.extra.socket as PresenceSocket;
                //     const userId = socket.userId;

                //     console.log("userId:", userId);

                //     if (userId && !socket.presenceConnected) {
                //         socket.presenceConnected = true;

                //         await presenceService.connect(userId, socket);
                //     }


                // },

                onDisconnect: async (context: any) => {

                    const socket = context.extra.socket;
                    const userId = socket?.userId;

                    if (!userId) return;

                    // MARK OFFLINE
                    await presenceService.markOffline(userId);
                }

            }
        },
       
        context: ({ req, res, extra }: any) => {
            // HTTP
            if (req) {
                return { req, res };
            }

            const userId = extra?.socket?.userId;

            if (userId) {
                return {
                    req: {
                        user: {
                            id: userId,
                        },
                    },
                };
            }

            return {};
        }
    };
}

function parseCookies(cookieHeader: string): Record<string, string> {
    const cookies: Record<string, string> = {};

    cookieHeader.split(";").forEach((cookie) => {
        const parts = cookie.split("=");
        const key = parts.shift()?.trim();
        if (!key) return;

        cookies[key] = decodeURIComponent(parts.join("="));
    });

    return cookies;
}

