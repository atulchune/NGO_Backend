import { Request, Response, NextFunction } from 'express';
import * as contentService from '../services/content.service';

export const getContents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = req.query.type as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;

    const result = await contentService.getAllContent(type, page, limit);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getLatestUpdates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await contentService.getLatestUpdates();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getContentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await contentService.getContentById(req.params.id as string);
    if (!content) {
      res.status(404).json({ success: false, message: 'Content not found' });
      return;
    }
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

export const createContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newContent = await contentService.createContent(req.body);
    res.status(201).json({ success: true, data: newContent });
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedContent = await contentService.updateContent(req.params.id as string, req.body);
    res.status(200).json({ success: true, data: updatedContent });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await contentService.deleteContent(req.params.id as string);
    res.status(200).json({ success: true, message: 'Content deleted successfully' });
  } catch (error) {
    next(error);
  }
};
