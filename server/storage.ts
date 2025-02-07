import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  users,
  bookmarks,
  readingProgress,
  type User,
  type InsertUser,
  type Bookmark,
  type InsertBookmark,
  type ReadingProgress,
  type InsertReadingProgress
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Bookmark operations
  getBookmarks(userId: number): Promise<Bookmark[]>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(id: number): Promise<void>;

  // Reading progress operations
  getReadingProgress(userId: number): Promise<ReadingProgress[]>;
  updateReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Bookmark operations
  async getBookmarks(userId: number): Promise<Bookmark[]> {
    return await db.select().from(bookmarks).where(eq(bookmarks.userId, userId));
  }

  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const [newBookmark] = await db.insert(bookmarks).values(bookmark).returning();
    return newBookmark;
  }

  async deleteBookmark(id: number): Promise<void> {
    await db.delete(bookmarks).where(eq(bookmarks.id, id));
  }

  // Reading progress operations
  async getReadingProgress(userId: number): Promise<ReadingProgress[]> {
    return await db.select().from(readingProgress).where(eq(readingProgress.userId, userId));
  }

  async updateReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress> {
    const [updatedProgress] = await db
      .insert(readingProgress)
      .values(progress)
      .onConflictDoUpdate({
        target: [readingProgress.userId, readingProgress.juz],
        set: { lastVerseId: progress.lastVerseId, updatedAt: new Date() }
      })
      .returning();
    return updatedProgress;
  }
}

export const storage = new DatabaseStorage();