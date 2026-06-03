import { z } from 'zod';

// --- Event Schemas ---
export const createEventSchema = z.object({
  body: z.object({
    title: z.string({ message: "Title is required" }).min(1, "Title cannot be empty"),
    description: z.string({ message: "Description is required" }),
    eventDate: z.string({ message: "Event date is required" }).datetime("Invalid date format"),
    location: z.string({ message: "Location is required" }),
    imageUrl: z.string().url().optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const updateEventSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    description: z.string().optional(),
    eventDate: z.string().datetime("Invalid date format").optional(),
    location: z.string().optional(),
    imageUrl: z.string().url().optional(),
    isPublished: z.boolean().optional(),
  }),
});

// --- HeroSection Schemas ---
export const createHeroSchema = z.object({
  body: z.object({
    title: z.string({ message: "Title is required" }).min(1, "Title cannot be empty"),
    subtitle: z.string({ message: "Subtitle is required" }),
    imageUrl: z.string().url().optional(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateHeroSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    subtitle: z.string().optional(),
    imageUrl: z.string().url().optional(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});
