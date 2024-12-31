import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { GeneralException } from 'src/common/exceptions/exception';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: GeneralException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const generalExceptionMessage = JSON.parse(exception.message);

    response.status(exception.getStatus()).json({
      success: false,
      code: generalExceptionMessage.code,
      message: generalExceptionMessage.message,
      data: null,
    });
  }
}
