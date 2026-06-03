import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, config.jwtSecret, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
