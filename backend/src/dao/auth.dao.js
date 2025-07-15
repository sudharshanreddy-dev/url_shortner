import User from '../models/user.model.js';
import { AppError } from '../utils/errorHandler.js';

export const createUser = async (userData) => {
    try {
        return await User.create(userData);
    } catch (error) {
        throw new AppError('Error creating user', 500);
    }
};

export const findUserByEmail = async (email, includePassword = false) => {
    try {
        let query = User.findOne({ email });
        if (includePassword) query = query.select('+password');
        return await query;
    } catch (error) {
        throw new AppError('Error finding user', 500);
    }
};

export const findUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw new AppError('Error finding user', 500);
    }
};

export const updateUserPassword = async (userId, newPassword) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new AppError('User not found', 404);

        user.password = newPassword;
        user.passwordChangedAt = Date.now();
        await user.save();

        return user;
    } catch (error) {
        throw new AppError('Error updating password', 500);
    }
};