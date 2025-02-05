import UnauthorizedError from "../../errors/UnauthorizedError";

export default class InvalidPasswordError extends UnauthorizedError {
  constructor() {
    super(`Invalid password`);
  }
}
