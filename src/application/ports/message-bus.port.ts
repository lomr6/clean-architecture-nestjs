export interface MessageBusPort {
  emit(pattern: string, date: any): void;
  send<T, R>(pattern: string, data: T): Promise<R>;
}
