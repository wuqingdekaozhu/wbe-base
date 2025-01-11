import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config';
import { GeneralException } from 'src/common/exceptions/exception';

@Injectable()
export class SignatureGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const signature = request.headers['x-signature'];
    const body = JSON.stringify(request.body);

    const validateSignature = (): boolean => {
      const header = {
        alg: 'HS256',
        typ: 'JWT',
      };

      try {
        const expectedSignature = jwt.sign(body, JWT_SECRET, { header });

        return signature === expectedSignature;
      } catch (err) {
        return false;
      }
    };

    if (request.method !== 'POST') return true;

    if (!signature) {
      throw new GeneralException(400, '2011', 'missing signature');
    } else if (!validateSignature()) {
      throw new GeneralException(403, '2012', 'invalid signature');
    }

    return true;
  }
}
