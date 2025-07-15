import rateLimit from 'express-rate-limit';
import { env } from '../config/config.js';
import { AppError } from '../utils/errorHandler.js';

export const rateLimit = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW * 60 * 1000, // minutes
    max: env.RATE_LIMIT_MAX, // limit each IP to requests per windowMs
    handler: (req, res, next) => {
        next(
            new AppError(
                `Too many requests from this IP, please try again after ${env.RATE_LIMIT_WINDOW} minutes`,
                429
            )
        );
    },
});