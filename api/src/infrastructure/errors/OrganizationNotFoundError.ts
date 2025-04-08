import NotFoundError from "../../errors/NotFoundError";

export default class OrganizationNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Organization with id "${id}" not found`);
  }
}
