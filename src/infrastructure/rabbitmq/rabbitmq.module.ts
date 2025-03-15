import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RmqService } from './rmq.service';

@Global()
@Module({
  providers: [
    RmqService,
    {
      provide: 'RABBITMQ_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://guest:guest@localhost:5672'],
            queue: 'main_queue',
            queueOptions: { durable: false },
          },
        });
      },
    },
  ],
  exports: ['RABBITMQ_CLIENT', RmqService],
})
export class RabbitmqModule {}
