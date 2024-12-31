import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    response.status(200);

    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          code: '000000',
          message: 'success',
          data: data,
        };
      }),
    );
  }
}
