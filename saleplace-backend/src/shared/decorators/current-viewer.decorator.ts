import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Viewer } from '@shared/viewer.types';


export const CurrentViewer = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Viewer => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const req = gqlCtx.getContext().req;

    if (req.user) {
      return {
        id: req.user.id,
        type: 'USER',
      };
    }
   
    return {
      id: req.visitorId,
      type: 'GUEST',
    };
  },
);
