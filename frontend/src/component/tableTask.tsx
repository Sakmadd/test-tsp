import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import { Container } from './container';
import { useEffect, useState } from 'react';
import { OrderType } from '../types/orderType';
import api from '../network/api';
import { formatDateFromString } from '../utils/formatDate';
import { useNavigate } from 'react-router-dom';

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
            <TableCaption>Imperial to metric conversion factors</TableCaption>
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
                      <Td>{order.history![0].status}</Td>
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
