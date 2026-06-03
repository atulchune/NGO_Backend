import { prisma } from '../utils/prisma.util';

export const getAllHeroSections = async () => {
  return await prisma.heroSection.findMany();
};

export const getHeroSectionById = async (id: string) => {
  return await prisma.heroSection.findUnique({
    where: { id },
  });
};

export const createHeroSection = async (data: any) => {
  if (data.isActive) {
    await prisma.heroSection.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });
  }
  return await prisma.heroSection.create({
    data,
  });
};

export const updateHeroSection = async (id: string, data: any) => {
  if (data.isActive) {
    await prisma.heroSection.updateMany({
      where: { isActive: true, id: { not: id } },
      data: { isActive: false },
    });
  }
  return await prisma.heroSection.update({
    where: { id },
    data,
  });
};

export const deleteHeroSection = async (id: string) => {
  return await prisma.heroSection.delete({
    where: { id },
  });
};
