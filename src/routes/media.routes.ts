import { Router } from 'express';
import { getMedia, getMediaById, createMedia, updateMedia, deleteMedia } from '../controllers/media.controller';
import { protect } from '../middlewares/auth.middleware';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = Router();

// Public routes
router.get('/', cacheMiddleware, getMedia);
router.get('/:id', cacheMiddleware, getMediaById);

// Protected admin routes
router.post('/', createMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

export default router;
