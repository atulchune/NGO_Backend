import { cache } from '../utils/cache.util';
import { prisma } from '../utils/prisma.util';

import { MediaCategory } from '@prisma/client';

export const getAllMedia = async (type?: string, isLive?: boolean, category?: MediaCategory, page: number = 1, limit: number = 10) => {
  const where: any = {};
  if (type) where.type = type;
  if (isLive !== undefined) where.isLive = isLive;
  if (category) where.category = category;

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.media.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.media.count({ where }),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getMediaById = async (id: string) => {
  return await prisma.media.findUnique({ where: { id } });
};

export const createMedia = async (data: any) => {
  const media = await prisma.media.create({ data });
  cache.flushAll(); // Clear cache on mutation
  return media;
};

export const updateMedia = async (id: string, data: any) => {
  const media = await prisma.media.update({
    where: { id },
    data,
  });
  cache.flushAll();
  return media;
};

export const deleteMedia = async (id: string) => {
  const media = await prisma.media.delete({
    where: { id },
  });
  cache.flushAll();
  return media;
};
