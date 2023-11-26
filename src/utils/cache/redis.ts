import Redis from 'ioredis';
import logger from '../logger';
export const redisClient = new Redis(process.env.REDIS_URL);
redisClient.on('error', (err) => {
  logger('redis', 'redisClient', err);
});

export const redisOffline = () => {
  const offline = new Redis(process.env.REDIS_URL, {
    enableOfflineQueue: false,
    lazyConnect: true,
  });

  offline.on('error', (err) => {
    logger('redis', 'redisOffline', err);
  });

  return offline;
};
