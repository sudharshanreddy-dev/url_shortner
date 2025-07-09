import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema(
    {
        fullUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true,
        },
        clicks: {
            type: Number,
            default: 0,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        expiresAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);


shortUrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


shortUrlSchema.index({ userId: 1, createdAt: -1 });

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

export default ShortUrl;
