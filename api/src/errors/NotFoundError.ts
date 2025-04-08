import BaseError from "./BaseErrors";

export default class NotFoundError extends BaseError {
  constructor(message: string, originalError?: unknown) {
    super(message, 404, originalError);
  }
}
