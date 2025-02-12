import express, { Express, NextFunction, Request, Response } from "express";
import * as http from "http";
import cors from "cors";
import HttpServer, {
  routeConfig,
} from "../../presentation/controllers/HttpServer";
import ErrorGlobalMiddleware from "./middleware/ErrorMiddleware";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

export default class ExpressAdapter implements HttpServer {
  private readonly app: Express;
  private server: http.Server;

  constructor(private readonly errorMiddleware: ErrorGlobalMiddleware) {
    this.app = express();

    const swaggerDocument = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../../../docs/routes/swagger.json"),
        "utf-8"
      )
    );
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
    this.app.use(this.errorMiddleware.handleGlobalErrorFunc());
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
