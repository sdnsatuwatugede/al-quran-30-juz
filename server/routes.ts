import type { Express } from "express";
import { createServer } from "http";

export function registerRoutes(app: Express) {
  // No backend routes needed as we're directly using the external API
  const httpServer = createServer(app);
  return httpServer;
}
