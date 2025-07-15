import { logger } from './logger.js';

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (err, req, res, next) => {
    const isProduction = process.env.NODE_ENV === 'production';

    logger.error({
        message: err.message,
        stack: isProduction ? undefined : err.stack,
        type: err.name,
        path: req.path,
        method: req.method,
    });

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'fail',
            message: 'Validation failed',
            errors: Object.values(err.errors).map((e) => ({
                field: e.path,
                message: e.message,
            })),
        });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(409).json({
            status: 'fail',
            message: `${field} already exists`,
        });
    }

    res.status(err.statusCode || 500).json({
        status: 'error',
        message: isProduction ? 'Something went wrong' : err.message,
        ...(!isProduction && { stack: err.stack }),
    });
};