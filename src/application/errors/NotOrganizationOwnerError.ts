import UnauthorizedError from "../../errors/UnauthorizedError";

export default class NotOrganizationOwnerError extends UnauthorizedError {
  constructor(organizationId: string) {
    super(`Not organization ${organizationId} owner`);
  }
}
