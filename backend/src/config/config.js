import { cleanEnv, str, num, url } from 'envalid';

export const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ['development', 'test', 'production'],
        default: 'development',
    }),
    PORT: num({ default: 3000 }),
    MONGO_URI: str(),
    MONGO_DB_NAME: str({ default: 'urlshort' }),
    JWT_SECRET: str(),
    JWT_EXPIRES_IN: str({ default: '7d' }),
    JWT_COOKIE_EXPIRES_IN: num({ default: 7 }),
    REDIS_URL: str({ default: 'redis://localhost:6379' }),
    CACHE_EXPIRATION: num({ default: 3600 }),
    RATE_LIMIT_WINDOW: num({ default: 60 }),
    RATE_LIMIT_MAX: num({ default: 100 }),
});