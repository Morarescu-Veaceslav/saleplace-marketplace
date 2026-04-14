import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

@Injectable()
export class VisitorIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        let visitorId = req.cookies?.visitorId;

        if (!visitorId) {
            visitorId = `guest:${uuid()}`;

            res.cookie('visitorId', visitorId, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 30,
            });
        }

        req.visitorId = visitorId;
        next();
    }
}
