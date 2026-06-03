import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma.util';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Attempt a simple query to check database connection
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ 
      success: true, 
      status: 'UP', 
      message: 'Server and Database are healthy' 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      status: 'DOWN', 
      message: 'Database connection failed', 
      error: error.message 
    });
  }
});

export default router;
