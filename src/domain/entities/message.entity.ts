export class MessageEntity {
  constructor(
    public readonly text: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
