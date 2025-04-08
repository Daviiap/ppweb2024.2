import BadRequestError from "../../errors/BadRequestError";

export default class InputValidationError extends BadRequestError {
  constructor(message: string, originalError?: unknown) {
    super(message, originalError);
  }
}
