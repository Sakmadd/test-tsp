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
import { useEffect, useState } from 'react';
import api from '../network/api';
import { formatDateFromString } from '../utils/formatDate';

export function TableOrder() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const fetchedOrders = await api.GET_ORDERS();
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
    }
    init();
  }, []);

  useEffect(() => {
    let filtered = orders;
    if (selectedDate) {
      filtered = filtered.filter((order) =>
        order.deadline.startsWith(selectedDate)
      );
    }
    if (selectedStatus) {
      filtered = filtered.filter(
        (order) => order.history![0].status === selectedStatus.toUpperCase()
      );
    }
    setFilteredOrders(filtered);
  }, [selectedDate, selectedStatus, orders]);

  return (
    <>
      <Flex flexDir={'column'} gap={'2rem'}>
        <Container>
          <Flex justifyContent={'center'} w={'full'} px={'20px'}>
            <Flex alignItems={'center'} gap={'20px'} w={'200px'}>
              <Input
                placeholder="Select Date"
                size="md"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Flex>

            <Flex alignItems={'center'} gap={'20px'} w={'250px'}>
              <Select
                placeholder="By Status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="pending">PENDING</option>
                <option value="progress">PROGRESS</option>
                <option value="completed">COMPLETED</option>
                <option value="canceled">CANCELED</option>
              </Select>
            </Flex>

            <Divider opacity={0}></Divider>

            <Button
              p={'25px'}
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
              <TableCaption>Order List</TableCaption>
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
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <Tr key={order.id}>
                      <Td>{order.product_name}</Td>
                      <Td>{order.quantity}</Td>
                      <Td>{formatDateFromString(order.deadline)}</Td>
                      <Td>{order.operator.username}</Td>
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
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={6} textAlign="center">
                      No orders found.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </Flex>
    </>
  );
}
