import { Router } from 'express';
import { register, login, logout, getMe, updatePassword } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { rateLimit } from '../middleware/rateLimit.middleware.js';
import { validateRegister, validateLogin, validateUpdatePassword } from '../validations/auth.validations.js';

const router = Router();

router.post('/register', rateLimit, validateRegister, register);
router.post('/login', rateLimit, validateLogin, login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.patch('/update-password', protect, validateUpdatePassword, updatePassword);

export default router;