import UseCasesFactory from "../../../application/factory/UseCasesFactory";
import LoginInputDTO from "../../dtos/input/LoginInputDTO";
import LoginOutputDTO from "../../dtos/output/LoginOutputDTO";
import ControllerHttp from "../ControllerHttp";
import HttpServer from "../HttpServer";

export default class LoginControllerHttp implements ControllerHttp {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCasesFactory: UseCasesFactory
  ) {}

  setAllControllerRoutes(): void {
    this.httpServer.addRoute({
      method: "post",
      url: "/login",
      auth: "none",
      handle: async (request) => {
        const input = new LoginInputDTO();
        input.email = request.body.email as string;
        input.password = request.body.password as string;
        input.validate();

        const loginInfo = await this.useCasesFactory
          .createLoginUseCase()
          .execute(input);

        const result = new LoginOutputDTO();
        result.token = loginInfo.token;
        result.user = {
          id: loginInfo.user.id,
          name: loginInfo.user.name,
          email: loginInfo.user.email,
        };

        return { statusCode: 200, body: result };
      },
    });
  }
}
