import { z } from "zod";

export const verseSchema = z.object({
  id: z.number(),
  surah: z.number(),
  nomor: z.number(),
  ar: z.string(),
  tr: z.string(),
  idn: z.string()
});

export const juzSchema = z.object({
  juz: z.number(),
  verses: z.array(verseSchema)
});

export type Verse = z.infer<typeof verseSchema>;
export type Juz = z.infer<typeof juzSchema>;
