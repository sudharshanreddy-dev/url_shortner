import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';
import { env } from './config.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGO_URI, {
            dbName: env.MONGO_DB_NAME,
            connectTimeoutMS: 5000,
            socketTimeoutMS: 30000,
            retryWrites: true,
            retryReads: true,
        });
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected');
});

export default connectDB;