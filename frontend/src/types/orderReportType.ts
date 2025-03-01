export type OrderReportType = {
  productName: string;
  pending: number;
  inProgress: number;
  completed: number;
  canceled: number;
};

export type OperatorReportType = {
  operatorName: string;
  productName: string;
  completed: number;
};
