import BaseError from "./BaseErrors";

export default class UnauthorizedError extends BaseError {
  constructor(message: string, originalError?: unknown) {
    super("Unauthorized: " + message, 401, originalError);
  }
}
