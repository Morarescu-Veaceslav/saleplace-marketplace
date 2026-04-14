import { CanActivate, type ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CanCreateProductGuard implements CanActivate {
    constructor(private prismaService: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const userId = ctx.getContext().req.user.id;

        const subscription = await this.prismaService.subscription.findUnique({
            where: { userId },
            include: { plan: true }
        });

        if (!subscription || subscription.status !== 'ACTIVE') {

            const productsCount = await this.prismaService.product.count({
                where: { userId },
            });

            if (productsCount >= 3) {
                throw new GraphQLError('Free product limit reached. Upgrade your plan', {
                    extensions: { code: 'FREE_PRODUCT_LIMIT' },
                });
            }

            return true
        }

        if (subscription.plan.productLimit === -1) {
            return true
        }

        if (subscription.productsUsed >= subscription.plan.productLimit!) {
            throw new GraphQLError('Product limit reached', {
                extensions: { code: 'PRODUCT_LIMIT_REACHED' },
            });
        }

        return true;
    }
}
