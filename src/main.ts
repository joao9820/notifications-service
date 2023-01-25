import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Necessário para trabalhar com validação no Nest
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
