import client from '../config/redis.js';
import { logger } from './logger.js';
import { env } from '../config/config.js';

export const getCache = async (key) => {
    try {
        const value = await client.get(key);
        if (value) {
            logger.debug(`Cache hit for key: ${key}`);
            return value;
        }
        return null;
    } catch (err) {
        logger.error(`Redis get error: ${err}`);
        return null;
    }
};

export const setCache = async (key, value, expiration = env.CACHE_EXPIRATION) => {
    try {
        await client.setEx(key, expiration, value);
        logger.debug(`Cache set for key: ${key}`);
    } catch (err) {
        logger.error(`Redis set error: ${err}`);
    }
};

export const invalidateCache = async (key) => {
    try {
        await client.del(key);
        logger.debug(`Cache invalidated for key: ${key}`);
    } catch (err) {
        logger.error(`Redis delete error: ${err}`);
    }
};

export const cacheMiddleware = async (req, res, next) => {
    try {
        const key = req.params.short;
        const cachedData = await getCache(key);

        if (cachedData) {
            return res.redirect(cachedData);
        }

        next();
    } catch (err) {
        next();
    }
};