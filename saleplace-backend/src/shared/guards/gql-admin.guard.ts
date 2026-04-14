import { CanActivate, type ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Injectable()
export class AdminGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;

        const user = request.user;
        if (!user || user.role !== 'ADMIN') {
            throw new GraphQLError('Access denied. Admins only.', {
                extensions: { code: 'ADMIN_ONLY' },
            });
        }

        return true;
    }
}
