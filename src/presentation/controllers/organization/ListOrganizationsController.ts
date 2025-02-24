import UseCasesFactory from "../../../application/factory/UseCasesFactory";
import { OwnerInputDTO } from "../../dtos/input/CreateOrganizationDTO";
import ListOrganizationsInputDTO from "../../dtos/input/ListOrganizationsDTO";
import ListOrganizationsOutputDTO from "../../dtos/output/ListOrganizationsOutputDTO";
import ControllerHttp from "../ControllerHttp";
import HttpServer from "../HttpServer";

export default class ListOrganizationsControllerHttp implements ControllerHttp {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCasesFactory: UseCasesFactory
  ) { }

  setAllControllerRoutes(): void {
    this.httpServer.addRoute({
      method: "get",
      url: "/organizations",
      auth: "jwt",
      handle: async (request) => {
        const input = new ListOrganizationsInputDTO();
        input.owner = request.body.authInfo as OwnerInputDTO;
        input.validate();

        const organizations = await this.useCasesFactory
          .createListOrganizationsUseCase()
          .execute(input);

        const output = new ListOrganizationsOutputDTO();
        output.organizations = organizations.map(organization => {
          return {
            id: organization.getId(),
            name: organization.getName(),
            description: organization.getDescription(),
          };
        });

        return { statusCode: 200, body: output };
      },
    });
  }
}
