import { z } from 'zod';

export const shortUrlValidator = z.object({
    fullUrl: z.preprocess((val) => {
        if (typeof val === 'string' && !/^https?:\/\//i.test(val)) {
            return `https://${val}`; // auto-add https
        }
        return val;
    }, z.string().url('Full URL must be a valid URL')),

    shortUrl: z
        .string()
        .min(1, 'Short URL cannot be empty')
        .max(100)
        .regex(/^[a-zA-Z0-9_-]+$/, 'Only alphanumeric, underscore, or hyphen allowed')
        .optional(),
    clicks: z.number().nonnegative().optional(),
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    expiresAt: z
        .preprocess((arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : undefined), z.date())
        .optional(),
});
