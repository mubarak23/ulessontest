import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { SentryFilter } from './filters/sentry.filter';
import { setupSwagger } from './swagger';

async function bootstrap() {
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
  });

  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  console.log('process.env.PORT', process.env.PORT);
  await app.listen(process.env.PORT);
  console.log(`running on ${process.env.PORT}`);
}
bootstrap();
