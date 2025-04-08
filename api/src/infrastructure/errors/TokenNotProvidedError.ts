import UnauthorizedError from "../../errors/UnauthorizedError";

export default class TokenNotProvidedError extends UnauthorizedError {
  constructor() {
    super(`No token provided`);
  }
}
