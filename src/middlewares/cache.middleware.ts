import { Request, Response, NextFunction } from 'express';
import { cache } from '../utils/cache.util';

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') {
    return next();
  }
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    res.status(200).json(cachedResponse);
    return;
  }
  
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    cache.set(key, body);
    return originalJson(body);
  };
  next();
};
