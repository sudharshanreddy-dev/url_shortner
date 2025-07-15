import { Router } from 'express';
import {
    createShortUrl,
    redirectShortUrl,
    deleteShortUrl,
    getUserUrls,
} from '../controllers/shortUrl.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { cacheMiddleware } from '../utils/cache.js';
import { validateCreateShortUrl } from '../validations/shortUrl.validations.js';

const router = Router();

router.use(protect);

router.post('/', validateCreateShortUrl, createShortUrl);
router.get('/', getUserUrls);
router.delete('/:id', deleteShortUrl);
router.get('/:short', cacheMiddleware, redirectShortUrl);

export default router;