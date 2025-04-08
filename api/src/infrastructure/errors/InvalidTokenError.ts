import UnauthorizedError from "../../errors/UnauthorizedError";

export default class InvalidTokenError extends UnauthorizedError {
  constructor() {
    super(`Invalid token`);
  }
}
