import { Router } from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller';
import { protect } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createEventSchema, updateEventSchema } from '../utils/validators';

const router = Router();

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected routes (Admin only)
router.post('/', validate(createEventSchema), createEvent);
router.put('/:id', validate(updateEventSchema), updateEvent);
router.delete('/:id', deleteEvent);

export default router;
