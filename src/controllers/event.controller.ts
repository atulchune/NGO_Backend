import { Request, Response, NextFunction } from 'express';
import * as eventService from '../services/event.service';

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await eventService.getEventById(req.params.id as string);
    if (!event) {
      res.status(404).json({ error: true, message: 'Event not found' });
      return;
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedEvent = await eventService.updateEvent(req.params.id as string, req.body);
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await eventService.deleteEvent(req.params.id as string);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
