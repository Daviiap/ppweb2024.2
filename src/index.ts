import "reflect-metadata";
import * as dotenv from "dotenv";
import { Pool, PoolConfig } from "pg";
import ExpressAdapter from "./infrastructure/express/Server";
import UseCasesFactory from "./application/factory/UseCasesFactory";
import HealthCheckControllerHttp from "./presentation/controllers/HealthCheckController";
import HealthRepositorySQL from "./infrastructure/repositories/HealthRepositorySQL";
import UserRepositorySQL from "./infrastructure/repositories/UserRepositorySQL";
import RegisterControllerHttp from "./presentation/controllers/user/RegisterController";
import ErrorGlobalMiddleware from "./infrastructure/express/middleware/ErrorMiddleware";
import JwtUtil from "./infrastructure/utils/JWTUtil";
import LoginControllerHttp from "./presentation/controllers/user/LoginController";
import AuthMiddleware from "./infrastructure/express/middleware/AuthMiddleware";
import CreateOrganizationControllerHttp from "./presentation/controllers/organization/CreateOrganizationController";
import OrganizationRepositorySQL from "./infrastructure/repositories/OrganizationRepositorySQL";
import ProjectRepositorySQL from "./infrastructure/repositories/ProjectRepositorySQL";
import CardRepositorySQL from "./infrastructure/repositories/CardRepositorySQL";
import UpdateOrganizationControllerHttp from "./presentation/controllers/organization/UpdateOrganizationController";
import ListOrganizationsControllerHttp from "./presentation/controllers/organization/ListOrganizationsController";
import GetOrganizationControllerHttp from "./presentation/controllers/organization/GetOrganizationController";
import DeleteOrganizationControllerHttp from "./presentation/controllers/organization/DeleteOrganizationController";

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
  const userRepository = new UserRepositorySQL(pool);
  const organizationRepository = new OrganizationRepositorySQL(pool);
  const projectRepository = new ProjectRepositorySQL(pool);
  const cardRepository = new CardRepositorySQL(pool);

  const jwtUtil = new JwtUtil(process.env.JWT_SECRET_KEY as string);

  const useCasesFactory = new UseCasesFactory(
    healthRepository,
    userRepository,
    organizationRepository,
    projectRepository,
    cardRepository,
    jwtUtil
  );

  const authMiddleware = new AuthMiddleware(jwtUtil);
  const errorMiddleware = new ErrorGlobalMiddleware();
  const httpServer = new ExpressAdapter(errorMiddleware, authMiddleware);

  const createOrganizationControllerHttp = new CreateOrganizationControllerHttp(
    httpServer,
    useCasesFactory
  );
  const updateOrganizationControllerHttp = new UpdateOrganizationControllerHttp(
    httpServer,
    useCasesFactory
  );
  const healthCheckController = new HealthCheckControllerHttp(
    httpServer,
    useCasesFactory
  );
  const registerController = new RegisterControllerHttp(
    httpServer,
    useCasesFactory
  );
  const listOrganizationsController = new ListOrganizationsControllerHttp(httpServer, useCasesFactory);
  const getOrganizationController = new GetOrganizationControllerHttp(httpServer, useCasesFactory);
  const deleteOrganizationController = new DeleteOrganizationControllerHttp(httpServer, useCasesFactory);
  const loginController = new LoginControllerHttp(httpServer, useCasesFactory);

  deleteOrganizationController.setAllControllerRoutes();
  getOrganizationController.setAllControllerRoutes();
  listOrganizationsController.setAllControllerRoutes();
  createOrganizationControllerHttp.setAllControllerRoutes();
  updateOrganizationControllerHttp.setAllControllerRoutes();
  healthCheckController.setAllControllerRoutes();
  registerController.setAllControllerRoutes();
  loginController.setAllControllerRoutes();

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
