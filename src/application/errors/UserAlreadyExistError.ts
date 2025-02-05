import ConflictError from "../../errors/ConflictError";

export default class UserAlreadyExistsError extends ConflictError {
  constructor(email: string) {
    super(`User with email "${email}" already exists`);
  }
}
