export type OrderReportType = {
  product_name: string;
  pending: number;
  in_progress: number;
  completed: number;
  canceled: number;
};

export type OperatorReportType = {
  operatorName: string;
  productName: string;
  completed: number;
};
