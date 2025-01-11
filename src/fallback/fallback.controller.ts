import { All, Controller } from '@nestjs/common';
import { GeneralException } from 'src/common/exceptions/exception';

@Controller()
export class FallbackController {
  @All('*')
  handleAll(): void {
    throw new GeneralException(404, '9999', 'not found');
  }
}
