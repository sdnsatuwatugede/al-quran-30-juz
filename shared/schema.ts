import { z } from "zod";

// API types
export const verseSchema = z.object({
  id: z.string(),
  arab: z.string(),
  audio: z.string(),
  ayah: z.string(),
  surah: z.string(),
  juz: z.string(),
  latin: z.string(),
  text: z.string(),
  asbab: z.string().nullable(),
  hizb: z.string().nullable(),
  notes: z.string().nullable(),
  page: z.string(),
  theme: z.string().nullable()
});

export const juzSchema = z.object({
  juz: z.number(),
  verses: z.array(verseSchema)
});

// User schema
export const insertUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  image: z.string().optional()
});

// Bookmark schema
export const insertBookmarkSchema = z.object({
  userId: z.string(),
  verseId: z.string(),
  note: z.string().optional()
});

// Reading progress schema
export const insertReadingProgressSchema = z.object({
  userId: z.string(),
  verseId: z.string(),
  lastRead: z.date().optional()
});

export type Verse = z.infer<typeof verseSchema>;
export type Juz = z.infer<typeof juzSchema>;