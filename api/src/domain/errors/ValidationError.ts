import UnprocessableEntityError from "../../errors/UnprocessableEntityError";

export default class ValidationError extends UnprocessableEntityError {
  constructor(reasons: { field: string; message: string }[]) {
    let message = "Validation error. ";
    const formattedReasons = reasons
      .map((reason) => `${reason.field}: ${reason.message}`)
      .join(", ");
    message += formattedReasons;
    super(message);
  }
}
