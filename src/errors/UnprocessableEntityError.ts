import BaseError from "./BaseErrors";

export default class UnprocessableEntityError extends BaseError {
  constructor(message: string, originalError?: unknown) {
    super("Unprocessable Entity: " + message, 422, originalError);
  }
}
