import { TableOrder } from '../component/tableOrder';
import { OrderType } from '../types/orderType';

export function ProductPage() {
  return (
    <>
      <TableOrder orders={dummyOrders} />
    </>
  );
}

export const dummyOrders: OrderType[] = [
  {
    id: 'WO-20240301-001',
    product_name: 'Sambungan Pipa',
    quantity: 20,
    deadline: new Date('2025-03-10T23:59:59Z'),
    operator_id: 'OP-001',
    history: [
      {
        id: 'HIS-001',
        description: 'test',
        order_id: 'WO-20240301-001',
        status: 'Pending',
        timestamp: new Date('2025-03-01T08:00:00Z'),
      },
      {
        id: 'HIS-002',
        description: 'test',
        order_id: 'WO-20240301-001',
        status: 'In Progress',
        timestamp: new Date('2025-03-05T10:30:00Z'),
      },
    ],
  },
  {
    id: 'WO-20240301-002',
    product_name: 'Baut Stainless',
    quantity: 100,
    deadline: new Date('2025-04-15T23:59:59Z'),
    operator_id: 'OP-002',
    history: [
      {
        id: 'HIS-003',
        description: 'test',
        order_id: 'WO-20240301-002',
        status: 'Pending',
        timestamp: new Date('2025-03-02T09:15:00Z'),
      },
      {
        id: 'HIS-004',
        description: 'test',
        order_id: 'WO-20240301-002',
        status: 'Completed',
        timestamp: new Date('2025-03-20T14:45:00Z'),
      },
    ],
  },
  {
    id: 'WO-20240301-003',
    product_name: 'Plat Besi 3mm',
    quantity: 50,
    deadline: new Date('2025-05-01T23:59:59Z'),
    operator_id: 'OP-003',
    history: [
      {
        id: 'HIS-005',
        description: 'test',
        order_id: 'WO-20240301-003',
        status: 'Pending',
        timestamp: new Date('2025-03-05T11:00:00Z'),
      },
    ],
  },
];
