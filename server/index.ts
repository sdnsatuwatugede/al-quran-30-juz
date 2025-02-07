import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Try to use port 5000, fallback to other ports if unavailable
  const tryPort = async (port: number): Promise<number> => {
    try {
      await new Promise<void>((resolve, reject) => {
        server.once('error', (err: any) => {
          if (err.code === 'EADDRINUSE') {
            server.close();
            resolve();
          } else {
            reject(err);
          }
        });
        
        server.listen(port, "0.0.0.0", () => {
          log(`Server started on port ${port}`);
          resolve();
        });
      });
      
      return port;
    } catch (error) {
      if (error.code === 'EADDRINUSE') {
        log(`Port ${port} is busy, trying ${port + 1}`);
        return tryPort(port + 1);
      }
      throw error;
    }
  };

  try {
    const port = await tryPort(5000);
    log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
