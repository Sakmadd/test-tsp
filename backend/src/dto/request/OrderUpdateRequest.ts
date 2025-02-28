export class OrderRequestDto {
  id: string;
  productName: string;
  quantity: number;
  deadline: string;
  operatorId: string;

  constructor({
    productName,
    quantity,
    deadline,
    operatorId,
    id,
  }: OrderRequestDto) {
    this.id = id;
    this.productName = productName;
    this.quantity = quantity;
    this.deadline = deadline;
    this.operatorId = operatorId;
  }
}
