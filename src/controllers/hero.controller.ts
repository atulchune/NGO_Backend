import { Request, Response, NextFunction } from 'express';
import * as heroService from '../services/hero.service';

export const getHeroSections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const heroes = await heroService.getAllHeroSections();
    res.status(200).json({ success: true, data: heroes });
  } catch (error) {
    next(error);
  }
};

export const getHeroSectionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hero = await heroService.getHeroSectionById(req.params.id as string);
    if (!hero) {
      res.status(404).json({ error: true, message: 'Hero Section not found' });
      return;
    }
    res.status(200).json({ success: true, data: hero });
  } catch (error) {
    next(error);
  }
};

export const createHeroSection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newHero = await heroService.createHeroSection(req.body);
    res.status(201).json({ success: true, data: newHero });
  } catch (error) {
    next(error);
  }
};

export const updateHeroSection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedHero = await heroService.updateHeroSection(req.params.id as string, req.body);
    res.status(200).json({ success: true, data: updatedHero });
  } catch (error) {
    next(error);
  }
};

export const deleteHeroSection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await heroService.deleteHeroSection(req.params.id as string);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
