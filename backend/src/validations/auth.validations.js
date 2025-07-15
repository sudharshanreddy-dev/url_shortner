import Joi from 'joi';

export const validateRegister = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const validateLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const validateUpdatePassword = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
});