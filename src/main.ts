import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import { AppModule } from './app.module';
import { PORT } from './utils/secrets';
import { PrismaErrHandler } from './utils/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({ origin: '*' }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.useGlobalFilters(new PrismaErrHandler());

  await app.listen(PORT);
}

bootstrap();
