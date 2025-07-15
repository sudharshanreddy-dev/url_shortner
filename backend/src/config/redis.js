import { createClient } from 'redis';
import { logger } from '../utils/logger.js';
import { env } from './config.js';

const client = createClient({
    url: env.REDIS_URL,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 5) {
                logger.error('Too many retries on Redis. Connection Terminated');
                return new Error('Too many retries');
            }
            return Math.min(retries * 100, 5000);
        },
    },
});

client.on('error', (err) => logger.error(`Redis Client Error: ${err}`));
client.on('connect', () => logger.info('Redis connected'));
client.on('reconnecting', () => logger.info('Redis reconnecting'));
client.on('ready', () => logger.info('Redis ready'));

await client.connect();

export default client;