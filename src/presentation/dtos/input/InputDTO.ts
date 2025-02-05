import { ValidationError, validateSync } from "class-validator";

export default class InputDTO {
  public validate(): void {
    const errors = validateSync(this, { skipMissingProperties: false });
    if (errors.length > 0) {
      const messages = this.flattenValidationErrors(errors);
      throw new Error(`${messages.join(", ")}`);
    }
  }

  private flattenValidationErrors(errors: ValidationError[]): string[] {
    const messages: string[] = [];
    for (const error of errors) {
      if (error.constraints) {
        messages.push(...Object.values(error.constraints));
      }
      if (error.children && error.children.length > 0) {
        messages.push(...this.flattenValidationErrors(error.children));
      }
    }
    return messages;
  }
}
