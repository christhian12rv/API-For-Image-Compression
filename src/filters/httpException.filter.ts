import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    const status = exception.getStatus();
    const message = exception.message;

    response.status(status).json({
      errors: [
        {
          code: status,
          message,
        },
      ],
    });
  }
}
