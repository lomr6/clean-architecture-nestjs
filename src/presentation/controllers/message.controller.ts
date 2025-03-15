import { Body, Controller, Post, Query } from '@nestjs/common';
import { SendMessageUseCase } from 'application/use-cases/send-message.usecase';
import { RmqService } from 'infrastructure/rabbitmq/rmq.service';

@Controller('messages')
export class MessageController {
  private readonly sendMessageUseCase: SendMessageUseCase;

  constructor(private readonly rmqService: RmqService) {
    this.sendMessageUseCase = new SendMessageUseCase(rmqService);
  }

  @Post()
  async sendMessage(@Query('text') text: string) {
    const result = await this.sendMessageUseCase.execute(text);
    return { success: true, message: result };
  }
}
