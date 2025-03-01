import { Status } from '@prisma/client';

export type HistoryType = {
  id: string;
  order_id: string;
  description: string;
  status: Status;
  timestamp: Date;
};
