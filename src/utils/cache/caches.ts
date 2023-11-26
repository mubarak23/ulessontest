import logger from '../logger';
import { redisClient } from './redis';

const expire = 86400;

const cache = {
  async get(key: string): Promise<string> {
    try {
      return (await redisClient.get(key)) || '';
    } catch (err) {
      logger('cache', 'get', err);
      return '';
    }
  },

  async set(key: string, value: string, exp?: number) {
    const ex = exp || expire;
    try {
      await redisClient.set(key, value, 'EX', ex);
    } catch (err) {
      logger('cache', 'set', err);
    }
  },

  async delete(key: string) {
    try {
      await redisClient.del(key);
    } catch (err) {
      logger('cache', 'delete', err);
    }
  },

  async update(key: string, newValue: string, exp?: number) {
    try {
      // Get the current value
      const currentValue = await this.get(key);

      if (currentValue !== '') {
        await this.set(key, newValue, exp);
      } else {
        logger('cache', 'update', `Key '${key}' not found.`);
      }
    } catch (err) {
      logger('cache', 'update', err);
    }
  },
};

export default Object.freeze(cache);
