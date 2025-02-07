import { z } from "zod";
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

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

// Database schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const bookmarks = pgTable('bookmarks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  juz: integer('juz').notNull(),
  verseId: text('verse_id').notNull(),
  note: text('note'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const readingProgress = pgTable('reading_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  juz: integer('juz').notNull(),
  lastVerseId: text('last_verse_id').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookmarks: many(bookmarks),
  readingProgress: many(readingProgress),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({ id: true, createdAt: true });
export const insertReadingProgressSchema = createInsertSchema(readingProgress).omit({ id: true, updatedAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;
export type ReadingProgress = typeof readingProgress.$inferSelect;
export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;