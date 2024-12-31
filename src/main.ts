import { NestFactory } from '@nestjs/core';
import { PORT } from 'src/config';
import { GeneralExceptionFilter } from 'src/common/filters/exception.filter';
import { ResponseFormatInterceptor } from 'src/common/interceptors/response-format.interceptor';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GeneralExceptionFilter());
  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  await app.listen(PORT ?? 3000);
}
bootstrap();
