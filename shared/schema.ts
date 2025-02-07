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

export type Verse = z.infer<typeof verseSchema>;
export type Juz = z.infer<typeof juzSchema>;