import { MessageBusPort } from 'application/ports/message-bus.port';
import { MessageEntity } from 'domain/entities/message.entity';

export class SendMessageUseCase {
  constructor(private readonly messageBus: MessageBusPort) {}

  async execute(text: string) {
    const message = new MessageEntity(text);

    this.messageBus.emit('hello_pattern', { text: message.text });

    return message;
  }
}
