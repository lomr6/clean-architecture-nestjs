import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class HelloConsumer {
  private readonly logger: Logger = new Logger('Consumer');
  @EventPattern('hello_pattern')
  handleHello(@Payload() data: any) {
    this.logger.log('New message received :', data);
  }
}
