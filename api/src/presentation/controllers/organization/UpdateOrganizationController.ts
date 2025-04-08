import UseCasesFactory from "../../../application/factory/UseCasesFactory";
import CreateOrganizationInputDTO, { OwnerInputDTO } from "../../dtos/input/CreateOrganizationDTO";
import UpdateOrganizationInputDTO from "../../dtos/input/UpdateOrganizationDTO";
import CreateOrganizationOutputDTO from "../../dtos/output/CreateOrganizationOutputDTO";
import UpdateOrganizationOutputDTO from "../../dtos/output/UpdateOrganizationOutputDTO";
import ControllerHttp from "../ControllerHttp";
import HttpServer from "../HttpServer";

export default class UpdateOrganizationControllerHttp implements ControllerHttp {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCasesFactory: UseCasesFactory
  ) {}

  setAllControllerRoutes(): void {
    this.httpServer.addRoute({
      method: "patch",
      url: "/organization/:id",
      auth: "jwt",
      handle: async (request) => {
        const input = new UpdateOrganizationInputDTO();
        input.owner = request.body.authInfo as OwnerInputDTO;
        input.name = request.body.name as string;
        input.description = request.body.description as string;
        input.id = request.params.id as string;
        input.validate();

        const organization = await this.useCasesFactory
          .createUpdateOrganizationUseCase()
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
