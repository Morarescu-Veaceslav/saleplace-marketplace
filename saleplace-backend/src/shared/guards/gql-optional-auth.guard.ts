import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class OptionalGqlAuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const userId = request.session?.userId;

    if (!userId) {
      request.user = null;
      return true;
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    request.user = user ?? null;
    return true;
  }
}
