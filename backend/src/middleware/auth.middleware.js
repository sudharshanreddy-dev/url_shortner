import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler.js';
import { env } from '../config/config.js';

export const protect = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401)
            );
        }

        const decoded = await jwt.verify(token, env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        next(err);
    }
};

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }
        next();
    };
};