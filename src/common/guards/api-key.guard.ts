import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { API_KEY } from 'src/config';
import { GeneralException } from 'src/common/exceptions/exception';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new GeneralException(400, '1011', 'missing api key');
    } else if (apiKey !== API_KEY) {
      throw new GeneralException(401, '1012', 'invalid api key');
    }

    return true;
  }
}
