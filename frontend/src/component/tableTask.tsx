import {
  Button,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../network/api';
import { OrderType } from '../types/orderType';
import { formatDateFromString } from '../utils/formatDate';
import { statusColorMap } from '../utils/statusColor';
import { Container } from './container';

export function TableTask() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderType[]>();

  useEffect(() => {
    async function init() {
      const orders = await api.GET_TASKS();
      setOrders(orders);
    }
    init();
  });

  return (
    <>
      <Container>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Quantity</Th>
                <Th>Deadline</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders
                ? orders.map((order) => (
                    <Tr key={order.id}>
                      <Td>{order.product_name}</Td>
                      <Td>{order.quantity}</Td>
                      <Td>{formatDateFromString(order.deadline)}</Td>
                      <Td>
                        <Tag
                          size="md"
                          variant="solid"
                          colorScheme={
                            statusColorMap[order.history![0].status] || 'gray'
                          }
                        >
                          {order.history?.[0]?.status}
                        </Tag>
                      </Td>
                      <Td>
                        <Button
                          variant={'ghost'}
                          m={0}
                          onClick={() => navigate('/order/history/' + order.id)}
                        >
                          <FaEdit />
                        </Button>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
