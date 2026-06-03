import { cache } from '../utils/cache.util';
import { prisma } from '../utils/prisma.util';

export const getAllContent = async (type?: string, page: number = 1, limit: number = 10) => {
  const where: any = {};
  if (type) where.type = type;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.content.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.content.count({ where }),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getLatestUpdates = async () => {
  return await prisma.content.findMany({
    where: { showInMarquee: true },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      type: true,
      updatedAt: true
    }
  });
};

export const getContentById = async (id: string) => {
  return await prisma.content.findUnique({ where: { id } });
};

export const createContent = async (data: any) => {
  const content = await prisma.content.create({ data });
  cache.flushAll(); // Clear cache on mutation
  return content;
};

export const updateContent = async (id: string, data: any) => {
  const content = await prisma.content.update({
    where: { id },
    data,
  });
  cache.flushAll();
  return content;
};

export const deleteContent = async (id: string) => {
  const content = await prisma.content.delete({
    where: { id },
  });
  cache.flushAll();
  return content;
};
