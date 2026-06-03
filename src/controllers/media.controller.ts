import { Request, Response, NextFunction } from 'express';
import * as mediaService from '../services/media.service';

export const getMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = req.query.type as string;
    const category = req.query.category as string;
    let isLive: boolean | undefined = undefined;
    if (req.query.isLive) {
      isLive = req.query.isLive === 'true';
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await mediaService.getAllMedia(type, isLive, category as any, page, limit);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getMediaById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const media = await mediaService.getMediaById(req.params.id as string);
    if (!media) {
      res.status(404).json({ success: false, message: 'Media not found' });
      return;
    }
    res.status(200).json({ success: true, data: media });
  } catch (error) {
    next(error);
  }
};

export const createMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newMedia = await mediaService.createMedia(req.body);
    res.status(201).json({ success: true, data: newMedia });
  } catch (error) {
    next(error);
  }
};

export const updateMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedMedia = await mediaService.updateMedia(req.params.id as string, req.body);
    res.status(200).json({ success: true, data: updatedMedia });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await mediaService.deleteMedia(req.params.id as string);
    res.status(200).json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    next(error);
  }
};
