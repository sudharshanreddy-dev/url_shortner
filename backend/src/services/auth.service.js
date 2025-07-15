import * as authDao from '../dao/auth.dao.js';
import { signToken } from '../utils/auth/auth.utils.js';
import { AppError } from '../utils/errorHandler.js';

export const registerUser = async (userData) => {
    const existingUser = await authDao.findUserByEmail(userData.email);
    if (existingUser) {
        throw new AppError('Email already in use', 400);
    }

    const user = await authDao.createUser(userData);
    return {
        user,
        token: signToken(user._id),
    };
};

export const loginUser = async (email, password) => {
    const user = await authDao.findUserByEmail(email, true);

    if (!user || !(await user.correctPassword(password))) {
        throw new AppError('Incorrect email or password', 401);
    }

    return {
        user,
        token: signToken(user._id),
    };
};

export const getCurrentUser = async (userId) => {
    return await authDao.findUserById(userId);
};

export const updatePassword = async (userId, currentPassword, newPassword) => {
    const user = await authDao.findUserByEmail(user.email, true);

    if (!(await user.correctPassword(currentPassword))) {
        throw new AppError('Your current password is wrong', 401);
    }

    return await authDao.updateUserPassword(userId, newPassword);
};