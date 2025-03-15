import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessageBusPort } from 'application/ports/message-bus.port';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RmqService implements MessageBusPort {
  constructor(@Inject('RABBITMQ_CLIENT') private client: ClientProxy) {}

  emit(pattern: string, data: any) {
    this.client.emit(pattern, data);
  }

  async send<T, R>(pattern: string, data: T): Promise<R> {
    return lastValueFrom(this.client.send<R, T>(pattern, data));
  }
}
