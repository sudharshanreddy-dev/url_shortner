import * as shortUrlDao from '../dao/shortUrl.dao.js';
import { nanoid } from 'nanoid';
import { setCache, invalidateCache } from '../utils/cache.js';
import { AppError } from '../utils/errorHandler.js';
import validator from 'validator';

export const createShortUrl = async (originalUrl, customAlias, expiresIn, userId) => {
    if (!validator.isURL(originalUrl, { protocols: ['http', 'https'] })) {
        throw new AppError('Please provide a valid URL with http or https', 400);
    }

    const formattedUrl = originalUrl.startsWith('http')
        ? originalUrl
        : `https://${originalUrl}`;

    const expiresAt = expiresIn
        ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000)
        : null;

    const shortUrl = await shortUrlDao.createShortUrl({
        originalUrl: formattedUrl,
        shortUrl: customAlias || nanoid(8),
        user: userId,
        expiresAt,
    });

    await setCache(shortUrl.shortUrl, shortUrl.originalUrl);
    return shortUrl;
};

export const redirectShortUrl = async (shortUrl) => {
    const url = await shortUrlDao.findShortUrl(shortUrl);
    if (!url) {
        throw new AppError('URL not found', 404);
    }

    const updatedUrl = await shortUrlDao.incrementClickCount(url._id);
    await setCache(updatedUrl.shortUrl, updatedUrl.originalUrl);
    return updatedUrl.originalUrl;
};

export const deleteUserShortUrl = async (id, userId) => {
    const url = await shortUrlDao.findShortUrlById(id, userId);
    if (!url) {
        throw new AppError('No URL found with that ID', 404);
    }

    await invalidateCache(url.shortUrl);
    return await shortUrlDao.deleteShortUrl(id, userId);
};

export const getUserShortUrls = async (userId, page, limit) => {
    return await shortUrlDao.getUserUrls(userId, page, limit);
};