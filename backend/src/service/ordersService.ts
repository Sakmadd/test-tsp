import { PrismaClient } from '@prisma/client';
import { OrderType } from '../types/orderType';
import { OrderCreateDto } from '../dto/request/OrderCreateRequest';
import { BadRequestException } from '../exception/BadRequestExpcetion';
import { OrderRequestDto } from '../dto/request/OrderUpdateRequest';
import { HistoryType } from '../types/historyType';
import { HistoryCreateDto } from '../dto/request/HistoryCreateRequest';
import { OrderSchema } from '../validators/orderSchema';
import { formatZodErrors } from '../utils/formatZodErrors';
import { HistorySchema } from '../validators/historySchema';
import { OperatorReportType, OrderReportType } from '../types/orderReportType';

const prisma = new PrismaClient();

class OrdersService {
  async create(request: OrderCreateDto): Promise<OrderType> {
    const { success, error } = OrderSchema.safeParse(request);
    if (!success) {
      formatZodErrors(error);
    }
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');

    const lastOrder = await prisma.order.findFirst({
      where: {
        id: {
          startsWith: `WO-${formattedDate}`,
        },
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
      },
    });

    let newOrderNumber = 1;
    if (lastOrder) {
      const lastNumber = parseInt(lastOrder.id.split('-')[2], 10);
      newOrderNumber = lastNumber + 1;
    }

    const newOrderId = `WO-${formattedDate}-${String(newOrderNumber).padStart(
      3,
      '0'
    )}`;

    const deadlineISO = new Date(request.deadline).toISOString();

    const isPM = await prisma.user.findFirst({
      where: { id: request.operatorId },
    });

    if (isPM?.role == 'PM') {
      throw new BadRequestException('Product Manager can assign as operator');
    }

    const order: OrderType = await prisma.order.create({
      data: {
        id: newOrderId,
        deadline: deadlineISO,
        product_name: request.productName,
        quantity: request.quantity,
        operator_id: request.operatorId,
      },
    });

    await prisma.history.create({
      data: {
        status: 'PENDING',
        description: 'Order created',
        order_id: newOrderId,
        timestamp: today.toISOString(),
      },
    });

    return order;
  }

  async update(request: OrderRequestDto): Promise<OrderType> {
    const { success, error } = OrderSchema.safeParse(request);
    if (!success) {
      formatZodErrors(error);
    }
    const deadlineISO = request.deadline
      ? new Date(request.deadline).toISOString()
      : undefined;

    const isPM = await prisma.user.findFirst({
      where: { id: request.operatorId },
    });

    if (isPM?.role == 'PM') {
      throw new BadRequestException('Product Manager can assign as operator');
    }

    const order: OrderType = await prisma.order.update({
      where: {
        id: request.id,
      },
      data: {
        deadline: deadlineISO,
        product_name: request.productName || undefined,
        quantity: request.quantity || undefined,
        operator_id: request.operatorId || undefined,
      },
    });

    return order;
  }

  async getTaskOP(userId: string): Promise<OrderType[]> {
    const orders: OrderType[] = await prisma.order.findMany({
      where: {
        operator: {
          id: userId,
        },
      },
      include: {
        history: {
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });

    return orders;
  }

  async getOrder(orderId: string): Promise<OrderType> {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        history: {
          orderBy: {
            timestamp: 'desc',
          },
        },
        operator: {
          omit: {
            password: true,
          },
        },
      },
    });

    if (!order) {
      throw new BadRequestException(`Not found frder with id ${orderId}`);
    }

    return order;
  }

  async getTaskPM(): Promise<OrderType[]> {
    const orders: OrderType[] = await prisma.order.findMany({
      include: {
        history: {
          orderBy: {
            timestamp: 'desc',
          },
        },
        operator: true,
      },
    });
    return orders;
  }

  async createHistory(request: HistoryCreateDto): Promise<HistoryType> {
    const { success, error } = HistorySchema.safeParse(request);
    if (!success) {
      formatZodErrors(error);
    }
    const today = new Date();
    const isOrderExist = await prisma.order.findFirst({
      where: { id: request.orderId },
    });

    if (!isOrderExist) {
      throw new BadRequestException('Order not found');
    }

    const history: HistoryType = await prisma.history.create({
      data: {
        status: request.status,
        description: request.description,
        order_id: request.orderId,
        timestamp: today.toISOString(),
      },
    });
    return history;
  }

  async getHistories(id: string): Promise<HistoryType[]> {
    const history = await prisma.history.findMany({
      where: {
        order_id: id,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
    return history;
  }

  async changeQuantity(id: string, quantity: number): Promise<void> {
    const isOrderExist = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!isOrderExist) {
      throw new BadRequestException('Order not found');
    }

    await prisma.order.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });
  }
}

export default new OrdersService();
