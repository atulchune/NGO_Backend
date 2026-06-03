import { Router } from 'express';
import { getContents, getLatestUpdates, getContentById, createContent, updateContent, deleteContent } from '../controllers/content.controller';
import { protect } from '../middlewares/auth.middleware';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = Router();

// Public routes
router.get('/latest-updates', cacheMiddleware, getLatestUpdates);
router.get('/', cacheMiddleware, getContents);
router.get('/:id', cacheMiddleware, getContentById);

// Protected admin routes
router.post('/', createContent);
router.put('/:id', updateContent);
router.delete('/:id', deleteContent);

export default router;
