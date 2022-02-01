import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import { AppModule } from './app.module';
import { PORT } from './utils/secrets';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({ origin: '*' }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(PORT);
}

bootstrap();
