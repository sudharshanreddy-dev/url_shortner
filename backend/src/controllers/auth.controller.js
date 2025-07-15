import * as authService from '../services/auth.service.js';
import { createSendToken } from '../utils/auth/auth.utils.js';


export const register = async (req, res, next) => {
    try {
        const { user, token } = await authService.registerUser(req.body);
        createSendToken(user, 201, res);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser(email, password);
        createSendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

export const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};

export const getMe = async (req, res, next) => {
    try {
        const user = await authService.getCurrentUser(req.user.id);
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await authService.updatePassword(
            req.user.id,
            currentPassword,
            newPassword
        );
        createSendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};