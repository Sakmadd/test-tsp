import { TableTask } from '../component/tableTask';
import { dummyOrders } from './productPage';

export function TaskPage() {
  return (
    <>
      <TableTask orders={dummyOrders} />
    </>
  );
}
