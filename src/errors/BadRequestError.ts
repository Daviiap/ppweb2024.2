import BaseError from "./BaseErrors";

export default class BadRequestError extends BaseError {
  constructor(message: string, originalError?: unknown) {
    super("Bad request: " + message, 400, originalError);
  }
}
