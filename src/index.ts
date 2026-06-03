import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env';
import { errorHandler } from './middlewares/error.middleware';
import eventRoutes from './routes/event.routes';
import heroRoutes from './routes/hero.routes';
import contentRoutes from './routes/content.routes';
import mediaRoutes from './routes/media.routes';
import uploadRoutes from './routes/upload.routes';

import healthRoutes from './routes/health.routes';

import path from 'path';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow images to be loaded cross-origin
}));
app.use(morgan('dev'));

// Static files (for Multer local uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Original Routes
app.use('/api/events', eventRoutes);
app.use('/api/hero', heroRoutes);

// New v1 Routes
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Health Check Route
app.use('/api/health', healthRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
