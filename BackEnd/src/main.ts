import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
// import { LoggingInterceptor } from './employees/employessInter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const { httpAdapter } = app.get(HttpAdapterHost) 
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.enableCors()
  // 全局注册拦截器
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(8080);
}
bootstrap();
