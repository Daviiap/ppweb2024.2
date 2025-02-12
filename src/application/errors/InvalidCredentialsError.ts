import UnauthorizedError from "../../errors/UnauthorizedError";

export default class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super(`Invalid credentials`);
  }
}
