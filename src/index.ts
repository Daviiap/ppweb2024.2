import * as dotenv from "dotenv";
import ExpressAdapter from "./infrastructure/Server";
import UseCasesFactory from "./application/factory/UseCasesFactory";
import HealthCheckControllerHttp from "./presentation/controllers/HealthCheckController";


async function main() {
  dotenv.config({ path: ".env" });

  const httpServer = new ExpressAdapter();

  const useCasesFactory = new UseCasesFactory();

  const healthCheckController = new HealthCheckControllerHttp(
    httpServer,
    useCasesFactory
  );
  healthCheckController.setAllControllerRoutes();

  httpServer.listen(Number(process.env.PORT || 3080));

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
