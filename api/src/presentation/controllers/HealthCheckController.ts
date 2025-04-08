import UseCasesFactory from "../../application/factory/UseCasesFactory";
import HealthCheckOutputDTO from "../dtos/output/HealthCheckOutputDTO";
import ControllerHttp from "./ControllerHttp";
import HttpServer from "./HttpServer";

export default class HealthCheckControllerHttp implements ControllerHttp {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCasesFactory: UseCasesFactory
  ) {}

  setAllControllerRoutes(): void {
    this.httpServer.addRoute({
      method: "get",
      url: "/health",
      auth: "none",
      handle: async () => {
        const health = await this.useCasesFactory
          .createHealthCheckUseCase()
          .execute();

        const result = new HealthCheckOutputDTO();
        result.healthy = health.ok;

        return { statusCode: 200, body: result };
      },
    });
  }
}
