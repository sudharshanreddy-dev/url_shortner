import { Router } from 'express';
import authRouter from './auth.routes.js';
import shortUrlRouter from './shortUrl.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/urls', shortUrlRouter);

export default router;