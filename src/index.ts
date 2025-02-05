import * as dotenv from "dotenv";
import { Pool, PoolConfig } from "pg";
import ExpressAdapter from "./infrastructure/Server";
import UseCasesFactory from "./application/factory/UseCasesFactory";
import HealthCheckControllerHttp from "./presentation/controllers/HealthCheckController";
import HealthRepositorySQL from "./infrastructure/repositories/HealthRepositorySQL";

async function main() {
  dotenv.config({ path: ".env" });

  const poolConfig: PoolConfig = {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  };
  const pool = new Pool(poolConfig);
  if (!pool) {
    throw new Error("Failed to connect to database.");
  }

  const healthRepository = new HealthRepositorySQL(pool);

  const httpServer = new ExpressAdapter();
  const useCasesFactory = new UseCasesFactory(healthRepository);

  const healthCheckController = new HealthCheckControllerHttp(
    httpServer,
    useCasesFactory
  );
  healthCheckController.setAllControllerRoutes();

  httpServer.listen(Number(process.env.PORT));

  process.on("SIGTERM", () => {
    httpServer.shutdown();
  });
  process.on("SIGINT", () => {
    httpServer.shutdown();
  });
}

main().catch((err) => {
  console.error("Init fail:", err);
  process.exit(1);
});
