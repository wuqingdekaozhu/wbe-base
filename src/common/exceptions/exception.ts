import { HttpException, HttpStatus } from '@nestjs/common';

export class GeneralException extends HttpException {
  constructor(status: HttpStatus, code: string, message: string) {
    super(
      JSON.stringify({
        code: code,
        message: message,
      }),
      status,
    );
  }
}
