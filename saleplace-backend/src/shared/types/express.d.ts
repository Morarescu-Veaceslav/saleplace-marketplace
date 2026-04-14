import 'express';

declare module 'express' {
  interface Request {
    visitorId?: string;
  }
}
