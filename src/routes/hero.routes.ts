import { Router } from 'express';
import { getHeroSections, getHeroSectionById, createHeroSection, updateHeroSection, deleteHeroSection } from '../controllers/hero.controller';
import { protect } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createHeroSchema, updateHeroSchema } from '../utils/validators';

const router = Router();

router.get('/', getHeroSections);
router.get('/:id', getHeroSectionById);

router.post('/', protect, validate(createHeroSchema), createHeroSection);
router.put('/:id', protect, validate(updateHeroSchema), updateHeroSection);
router.delete('/:id', protect, deleteHeroSection);

export default router;
