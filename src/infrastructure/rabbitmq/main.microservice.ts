import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitmqModule } from './rabbitmq.module';
import { Logger } from '@nestjs/common';
import { AppModule } from 'infrastructure/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'main_queue',
      queueOptions: { durable: false },
    },
  });
  await app.listen();
  Logger.log('RabbitMQ microservice started, listening on main_queue...');
}

bootstrap();
