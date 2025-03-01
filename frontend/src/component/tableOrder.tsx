import {
  Button,
  Divider,
  Flex,
  Input,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Container } from '../component/container';
import { OrderType } from '../types/orderType';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Props {
  orders: OrderType[];
}

export function TableOrder({ orders }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Flex justifyContent={'center'} w={'full'} pt={'20px'} px={'20px'}>
          <Flex alignItems={'center'} gap={'20px'} w={'200px'}>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
            />
          </Flex>
          <Flex alignItems={'center'} gap={'20px'} w={'200px'}>
            <Select placeholder="By Status">
              <option value="pending">PENDING</option>
              <option value="progress">PROGRESS</option>
              <option value="completed">COMPLETED</option>
              <option value="canceled">CANCELED</option>
            </Select>
          </Flex>
          <Divider opacity={0}></Divider>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => navigate('/order/create')}
          >
            Add Order
          </Button>
        </Flex>
      </Container>
      <Container>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Quantity</Th>
                <Th>Deadline</Th>
                <Th>Operator</Th>
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
                  <Td>{order.operator_id}</Td>
                  <Td>{order.history![0].status}</Td>
                  <Td>
                    <Button
                      variant={'ghost'}
                      m={0}
                      onClick={() => navigate('/order/edit/' + order.id)}
                    >
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
