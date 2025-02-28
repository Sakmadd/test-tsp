import { Status } from '@prisma/client';

export class HistoryCreateDto {
  orderId: string;
  description: string;
  status: Status;

  constructor({ orderId, description, status }: HistoryCreateDto) {
    this.orderId = orderId;
    this.description = description;
    this.status = status;
  }
}
