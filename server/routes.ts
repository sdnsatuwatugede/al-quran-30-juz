import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertBookmarkSchema, insertReadingProgressSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  // Proxy route for MyQuran API
  app.get("/api/quran/*", async (req, res) => {
    try {
      const apiPath = req.path.replace("/api/quran", "");
      const response = await fetch(`https://api.myquran.com/v2/quran${apiPath}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch from MyQuran API" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}