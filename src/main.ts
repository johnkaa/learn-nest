import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { ResponseInterceptor } from './common/interceptors/response.interceptor';
// import { AllExceptionFilter } from './common/filters/all-exception.filter';
import cookieParser from 'cookie-parser';
// import { setupSwagger } from './utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalFilters(new AllExceptionFilter());

  // setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
