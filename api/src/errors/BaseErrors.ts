export default abstract class BaseError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly originalError?: Error | Record<string, unknown> | unknown | any
  ) {
    super(message);
  }
}
