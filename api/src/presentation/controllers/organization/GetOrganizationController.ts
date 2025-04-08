import UseCasesFactory from "../../../application/factory/UseCasesFactory";
import { OwnerInputDTO } from "../../dtos/input/CreateOrganizationDTO";
import GetOrganizationInputDTO from "../../dtos/input/GetOrganizationDTO";
import UpdateOrganizationOutputDTO from "../../dtos/output/UpdateOrganizationOutputDTO";
import ControllerHttp from "../ControllerHttp";
import HttpServer from "../HttpServer";

export default class GetOrganizationControllerHttp implements ControllerHttp {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCasesFactory: UseCasesFactory
  ) {}

  setAllControllerRoutes(): void {
    this.httpServer.addRoute({
      method: "get",
      url: "/organization/:id",
      auth: "jwt",
      handle: async (request) => {
        const input = new GetOrganizationInputDTO();
        input.owner = request.body.authInfo as OwnerInputDTO;
        input.id = request.params.id as string;
        input.validate();

        const organization = await this.useCasesFactory
          .createGetOrganizationUseCase()
          .execute(input);

        const output = new UpdateOrganizationOutputDTO();
        output.id = organization.getId();
        output.name = organization.getName();
        output.description = organization.getDescription();

        return { statusCode: 200, body: output };
      },
    });
  }
}
