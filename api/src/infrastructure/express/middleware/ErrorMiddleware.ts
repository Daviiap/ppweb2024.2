import { NextFunction, Request, Response } from 'express';
import BaseError from '../../../errors/BaseErrors';

export default class ErrorGlobalMiddleware {
  constructor() {}

  handleGlobalErrorFunc() {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
      const errorId = crypto.randomUUID();
      const response = this.constructErrorResponse(err, errorId);

      this.logError(req, err, errorId);

      res.status(response.statusCode).json({ id: response.errorId, message: response.message });
    };
  }

  private constructErrorResponse(
    err: Error | BaseError,
    errorId: string
  ): {
    errorId: string;
    statusCode: number;
    message: string;
  } {
    if (err instanceof BaseError) {
      return {
        errorId,
        statusCode: err.statusCode,
        message: err.statusCode < 500 ? err.message : err.message.split(':')[0],
      };
    }

    return {
      errorId,
      statusCode: 500,
      message: 'Internal server error',
    };
  }

  private logError(req: Request, err: Error | BaseError, errorId: string) {
    const logObject = {
      errorId,
      message: err.message,
      url: req.url,
      method: req.method,
      stack: err.stack,
      originalError: undefined,
    };

    if (err instanceof BaseError) {
      logObject.originalError = err.originalError
        ? {
            ...err.originalError,
            ...(err.originalError.message ? { message: err.originalError.message } : {}),
          }
        : undefined;

      console.error(`${err.name}:`, logObject);
      return;
    }

    console.error('Uncaught Error:', logObject);
    return;
  }
}
