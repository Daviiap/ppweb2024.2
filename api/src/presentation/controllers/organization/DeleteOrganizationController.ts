import UseCasesFactory from "../../../application/factory/UseCasesFactory";
import { OwnerInputDTO } from "../../dtos/input/CreateOrganizationDTO";
import DeleteOrganizationInputDTO from "../../dtos/input/DeleteOrganizationDTO";
import GetOrganizationInputDTO from "../../dtos/input/GetOrganizationDTO";
import UpdateOrganizationOutputDTO from "../../dtos/output/UpdateOrganizationOutputDTO";
import ControllerHttp from "../ControllerHttp";
import HttpServer from "../HttpServer";

export default class DeleteOrganizationControllerHttp implements ControllerHttp {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCasesFactory: UseCasesFactory
  ) {}

  setAllControllerRoutes(): void {
    this.httpServer.addRoute({
      method: "delete",
      url: "/organization/:id",
      auth: "jwt",
      handle: async (request) => {
        const input = new DeleteOrganizationInputDTO();
        input.owner = request.body.authInfo as OwnerInputDTO;
        input.id = request.params.id as string;
        input.validate();

        await this.useCasesFactory
          .createDeleteOrganizationUseCase()
          .execute(input);

        return { statusCode: 204 };
      },
    });
  }
}
