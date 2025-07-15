import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './config/db.js';
import router from './routes/index.js';
import { errorHandler } from './utils/errorHandler.js';
import { logger } from './utils/logger.js';
import { env } from './config/config.js';

const app = express();

// 1) GLOBAL MIDDLEWARES
app.use(cors({
    origin: env.NODE_ENV === 'development' ? '*' : process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// 2) DATABASE CONNECTION
connectDB();

// 3) ROUTES
app.use('/api/v1', router);

// 4) ERROR HANDLING
app.use(errorHandler);

// 5) START SERVER
const port = env.PORT || 3000;
const server = app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

export default app;