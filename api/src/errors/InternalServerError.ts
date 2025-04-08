import BaseError from "./BaseErrors";

export default class InternalServerError extends BaseError {
  constructor(message: string, originalError?: unknown) {
    super("Internal Server Error: " + message, 500, originalError);
  }
}
