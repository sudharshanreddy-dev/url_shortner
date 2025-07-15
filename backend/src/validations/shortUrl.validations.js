import Joi from 'joi';

export const validateCreateShortUrl = Joi.object({
    originalUrl: Joi.string().uri().required(),
    customAlias: Joi.string().alphanum().min(3).max(20),
    expiresIn: Joi.number().integer().min(1).max(365),
});