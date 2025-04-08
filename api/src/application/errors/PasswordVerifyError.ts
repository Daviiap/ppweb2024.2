import InternalServerError from "../../errors/InternalServerError";

export default class PasswordVerifyError extends InternalServerError {
  constructor(originalError: unknown) {
    super(`Error verifying password`, originalError);
  }
}
