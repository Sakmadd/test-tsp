import { HistoryType } from './historyType';
import { UserType } from './userType';

export type OrderType = {
  id: string;
  product_name: string;
  quantity: number;
  deadline: string;
  operator_id: string;
  operator: UserType;
  history?: HistoryType[];
};
