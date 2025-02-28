import { HistoryType } from './historyType';

export type OrderType = {
  id: string;
  product_name: string;
  quantity: number;
  deadline: Date;
  operator_id: string;
  history?: HistoryType[];
};
