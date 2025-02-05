import UseCasesFactory from "../../../application/factory/UseCasesFactory";
import RegisterUserInputDTO from "../../dtos/input/RegisterUserInputDTO";
import HealthCheckOutputDTO from "../../dtos/output/HealthCheckOutputDTO";
import RegisterUserOutputDTO from "../../dtos/output/RegisterUserOutputDTO";
import ControllerHttp from "../ControllerHttp";
import HttpServer from "../HttpServer";

export default class RegisterControllerHttp implements ControllerHttp {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCasesFactory: UseCasesFactory
  ) {}

  setAllControllerRoutes(): void {
    this.httpServer.addRoute({
      method: "post",
      url: "/register",
      auth: "none",
      handle: async request => {
        const input = new RegisterUserInputDTO();
        input.email = request.body.email as string;
        input.name = request.body.name as string;
        input.password = request.body.password as string;
        input.validate();

        const createdUser = await this.useCasesFactory
          .createRegisterUserUseCase()
          .execute(input);

        const result = new RegisterUserOutputDTO();
        result.id = createdUser.getId();
        result.name = createdUser.getName();
        result.email = createdUser.getEmail();

        return { statusCode: 201, body: result };
      },
    });
  }
}
