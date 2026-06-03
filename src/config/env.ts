import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'super-secret-key',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5433/ngo_db',
};
