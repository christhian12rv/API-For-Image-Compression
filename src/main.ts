import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './configs/config';
import { HttpExceptionFilter } from './filters/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(config.port);
}
bootstrap();
