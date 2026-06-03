import { prisma } from '../utils/prisma.util';

export const getAllEvents = async () => {
  return await prisma.event.findMany({
    orderBy: { eventDate: 'asc' },
  });
};

export const getEventById = async (id: string) => {
  return await prisma.event.findUnique({
    where: { id },
  });
};

export const createEvent = async (data: any) => {
  return await prisma.event.create({
    data,
  });
};

export const updateEvent = async (id: string, data: any) => {
  return await prisma.event.update({
    where: { id },
    data,
  });
};

export const deleteEvent = async (id: string) => {
  return await prisma.event.delete({
    where: { id },
  });
};
