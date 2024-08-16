import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

/**
 * Http Error Filter.
 * Gets an HttpException in code and creates an error response
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exceptionResponse: any = exception.getResponse();

    response.status(statusCode).json({
      statusCode,
      ...(statusCode !== HttpStatus.UNPROCESSABLE_ENTITY
        ? { message: exception.message }
        : { error: exceptionResponse.message }),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
