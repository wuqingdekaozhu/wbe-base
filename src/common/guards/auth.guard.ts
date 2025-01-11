import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config';
import { GeneralException } from 'src/common/exceptions/exception';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    const validateUser = (token: string): boolean => {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    };

    if (!authorizationHeader) throw new GeneralException(401, '3011', 'missing authorization header');

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer') throw new GeneralException(401, '3012', 'incorrect token scheme');

    if (!validateUser(token as string)) throw new GeneralException(403, '3013', 'invalid token');

    return true;
  }
}
