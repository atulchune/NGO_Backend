import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: true, message: 'No file uploaded' });
      return;
    }

    // Determine the base URL dynamically based on the request host
    // or use a predefined environment variable
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;
    
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.status(200).json({ 
      success: true, 
      data: { 
        uploadUrl: null, // No longer needed for frontend directly
        fileUrl 
      } 
    });
  } catch (error) {
    next(error);
  }
};
