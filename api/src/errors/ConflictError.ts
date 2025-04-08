import BaseError from "./BaseErrors";

export default class ConflictError extends BaseError {
  constructor(message: string, originalError?: unknown) {
    super("Conflict: " + message, 409, originalError);
  }
}
