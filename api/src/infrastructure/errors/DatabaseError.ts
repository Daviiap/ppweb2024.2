import InternalServerError from "../../errors/InternalServerError";

export default class DatabaseError extends InternalServerError {
  constructor(message: string, originalError?: unknown) {
    super(message, originalError);
  }
}
