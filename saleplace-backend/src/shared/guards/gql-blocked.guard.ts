import { CanActivate, type ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { GraphQLError } from 'graphql';

@Injectable()
export class BlockedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;

        if (user.blockedUntil && user.blockedUntil > new Date()) {
            throw new GraphQLError('Account is blocked.', {
                extensions: { code: 'ACCOUNT_BLOCKED' },
            });
        }

        return true;
    }
}
