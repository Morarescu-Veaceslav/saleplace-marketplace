import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import { RedisService } from './core/redis/redis.service';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { parseMs } from './shared/utils/ms.utils';
import { parseBoolean } from './shared/utils/parse-boolean';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false
  });

  app.use(
    bodyParser.json({
      verify: (req: any, res, buf) => {
        if (req.originalUrl === '/webhook/stripe') {
          req.rawBody = buf;
        }
      },
    }),
  )

  app.useGlobalFilters(new PrismaExceptionFilter());
  const config = app.get(ConfigService)

  const redisService = app.get(RedisService);
  const RedisStore = connectRedis(session);

  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )


  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: config.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: parseMs(config.getOrThrow<string>('SESSION_MAX_AGE')),
        httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: false, // obligatoriu false pentru localhost
        sameSite: 'lax', // dacă frontend e pe același port; dacă e pe alt port -> 'none'
      },
      store: new RedisStore({
        client: redisService.client,
        prefix: config.getOrThrow<string>('SESSION_FOLDER'),
        disableTouch: true,
      }),
    }),
  );

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie']
  })

  await app.listen(Number(config.get('APPLICATION_PORT')) ?? 4000);
}
bootstrap();

