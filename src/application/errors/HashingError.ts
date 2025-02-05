import InternalServerError from "../../errors/InternalServerError";

export default class HashingError extends InternalServerError {
  constructor(originalError: unknown) {
    super(`Error hashing password`, originalError);
  }
}
