import express, { Express, NextFunction, Request, Response } from "express";
import * as http from "http";
import cors from "cors";
import HttpServer, {
  routeConfig,
} from "../presentation/controllers/HttpServer";

export default class ExpressAdapter implements HttpServer {
  private readonly app: Express;
  private server: http.Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  addRoute(route: routeConfig): void {
    this.app[route.method](
      route.url,
      async function (req: Request, res: Response, next: NextFunction) {
        try {
          const output = await route.handle(req);

          res.status(output.statusCode).json(output.body);
        } catch (err) {
          next(err);
        }
      }
    );
  }

  listen(port: number): void {
    this.server = this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  shutdown(): void {
    console.log("Shutting down gracefully...");
    this.server.close(() => {
      console.log("Closed out remaining connections.");
      process.exit(0);
    });
  }
}
