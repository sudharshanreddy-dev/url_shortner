import * as shortUrlService from '../services/shortUrl.service.js';
import { AppError } from '../utils/errorHandler.js';

export const createShortUrl = async (req, res, next) => {
    try {
        const { originalUrl, customAlias, expiresIn } = req.body;
        const shortUrl = await shortUrlService.createShortUrl(
            originalUrl,
            customAlias,
            expiresIn,
            req.user.id
        );
        res.status(201).json({
            status: 'success',
            data: {
                shortUrl,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const redirectShortUrl = async (req, res, next) => {
    try {
        const originalUrl = await shortUrlService.redirectShortUrl(req.params.short);
        res.redirect(originalUrl);
    } catch (err) {
        next(err);
    }
};

export const deleteShortUrl = async (req, res, next) => {
    try {
        await shortUrlService.deleteUserShortUrl(req.params.id, req.user.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err);
    }
};

export const getUserUrls = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const urls = await shortUrlService.getUserShortUrls(req.user.id, page, limit);
        res.status(200).json({
            status: 'success',
            results: urls.length,
            data: {
                urls,
            },
        });
    } catch (err) {
        next(err);
    }
};