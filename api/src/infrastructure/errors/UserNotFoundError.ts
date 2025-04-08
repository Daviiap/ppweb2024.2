import NotFoundError from "../../errors/NotFoundError";

export default class UserNotFoundError extends NotFoundError {
  constructor(email: string) {
    super(`User with email "${email}" not found`);
  }
}
