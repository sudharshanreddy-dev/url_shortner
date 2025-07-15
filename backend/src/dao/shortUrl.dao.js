import ShortUrl from '../models/shortUrl.model.js';
import { AppError } from '../utils/errorHandler.js';

export const createShortUrl = async (urlData) => {
    try {
        return await ShortUrl.create(urlData);
    } catch (error) {
        throw new AppError('Error creating short URL', 500);
    }
};

export const findShortUrl = async (shortUrl) => {
    try {
        return await ShortUrl.findOne({ shortUrl });
    } catch (error) {
        throw new AppError('Error finding short URL', 500);
    }
};

export const findShortUrlById = async (id, userId) => {
    try {
        return await ShortUrl.findOne({ _id: id, user: userId });
    } catch (error) {
        throw new AppError('Error finding short URL', 500);
    }
};

export const incrementClickCount = async (shortUrlId) => {
    try {
        return await ShortUrl.findByIdAndUpdate(
            shortUrlId,
            { $inc: { clicks: 1 } },
            { new: true }
        );
    } catch (error) {
        throw new AppError('Error updating click count', 500);
    }
};

export const deleteShortUrl = async (id, userId) => {
    try {
        const result = await ShortUrl.deleteOne({ _id: id, user: userId });
        if (result.deletedCount === 0) {
            throw new AppError('No URL found with that ID', 404);
        }
        return result;
    } catch (error) {
        throw new AppError('Error deleting short URL', 500);
    }
};

export const getUserUrls = async (userId, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        return await ShortUrl.find({ user: userId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
    } catch (error) {
        throw new AppError('Error fetching user URLs', 500);
    }
};