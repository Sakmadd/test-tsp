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
import { OrderType } from '../types/orderType';
import { Container } from './container';

interface Props {
  orders: OrderType[];
}

export function TableTask({ orders }: Props) {
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
              {orders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.product_name}</Td>
                  <Td>{order.quantity}</Td>
                  <Td>{order.deadline.toDateString()}</Td>
                  <Td>{order.history![0].status}</Td>
                  <Td>
                    <Button variant={'ghost'} m={0}>
                      <FaEdit />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
