import UseCasesFactory from "../../../application/factory/UseCasesFactory";
import CreateOrganizationInputDTO, { OwnerInputDTO } from "../../dtos/input/CreateOrganizationDTO";
import ControllerHttp from "../ControllerHttp";
import HttpServer from "../HttpServer";

export default class CreateOrganizationControllerHttp implements ControllerHttp {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCasesFactory: UseCasesFactory
  ) {}

  setAllControllerRoutes(): void {
    this.httpServer.addRoute({
      method: "post",
      url: "/organization",
      auth: "jwt",
      handle: async (request) => {
        const input = new CreateOrganizationInputDTO();
        input.owner = request.body.authInfo as OwnerInputDTO;
        input.name = request.body.name as string;
        input.description = request.body.description as string;
        input.validate();

        const organization = await this.useCasesFactory
          .createCreateOrganizationUseCase()
          .execute(input);

        return { statusCode: 200, body: organization };
      },
    });
  }
}
