import NotFoundError from "../../errors/NotFoundError";

export default class ProjectNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Project with id "${id}" not found`);
  }
}
