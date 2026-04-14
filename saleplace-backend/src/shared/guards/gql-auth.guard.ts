import { CanActivate, type ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { PrismaService } from "src/core/prisma/prisma.service";
import { GraphQLError } from 'graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate {
    public constructor(private readonly prismaService: PrismaService) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const gqlContext = ctx.getContext()

        let userId: string | undefined;

        // ✅ HTTP
        if (gqlContext.req?.session?.userId) {
            userId = gqlContext.req.session.userId;
        }

        // ✅ WS (subscriptions)
        if (!userId && gqlContext.req?.user?.id) {
            userId = gqlContext.req.user.id;
        }

        if (!userId) {
            throw new GraphQLError('You do not have the required permission. Please log in.', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        gqlContext.req.user = user;

        return true;
    }
}