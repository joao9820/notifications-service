import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  //const configService = app.get(ConfigService);

  /* const user = configService.get('RABBITMQ_USER');
  const password = configService.get('RABBITMQ_PASSWORD');
  const host = configService.get('RABBITMQ_HOST');
  const queueName = configService.get('RABBITMQ_QUEUE_NAME'); */

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:15672'],
      queue: 'email_queue',
      queueOptions: {
        durable: true
      },
    },
  });

  await app.startAllMicroservices();

  //Necessário para trabalhar com validação no Nest
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
