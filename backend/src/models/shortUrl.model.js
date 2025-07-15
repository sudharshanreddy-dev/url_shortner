import mongoose from 'mongoose';
import validator from 'validator';

const shortUrlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: [true, 'Original URL is required'],
            validate: {
                validator: function (v) {
                    return validator.isURL(v, {
                        protocols: ['http', 'https'],
                        require_protocol: true,
                    });
                },
                message: (props) => `${props.value} is not a valid URL`,
            },
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        clicks: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        expiresAt: {
            type: Date,
            index: { expireAfterSeconds: 0 },
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

shortUrlSchema.index({ user: 1 });
shortUrlSchema.index({ shortUrl: 1, user: 1 }, { unique: true });

export default mongoose.model('ShortUrl', shortUrlSchema);