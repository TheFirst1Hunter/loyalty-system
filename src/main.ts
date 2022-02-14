import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cors from 'cors';
import { AppModule } from './app.module';
import { PORT } from './utils/secrets';
import { PrismaErrHandler } from './utils/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('loyalty-system')
    .setDescription('a loyalty system made for biat halab')
    .setVersion('1.0')
    .addTag('tags')
    .addBasicAuth()
    .build();

  app.use(cors({ origin: '*' }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.useGlobalFilters(new PrismaErrHandler());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}

bootstrap();
