export class OrderCreateDto {
  productName: string;
  quantity: number;
  deadline: string;
  operatorId: string;

  constructor({ productName, quantity, deadline, operatorId }: OrderCreateDto) {
    this.productName = productName;
    this.quantity = quantity;
    this.deadline = deadline;
    this.operatorId = operatorId;
  }
}
