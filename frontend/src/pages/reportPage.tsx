import {
  Flex,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Container } from '../component/container';
import api from '../network/api';
import { OrderType } from '../types/orderType';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function ReportPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    async function init() {
      const fetchedOrders = await api.GET_ORDERS();
      setOrders(fetchedOrders);
    }
    init();
  }, []);

  const pendingOrders = orders.filter(
    (order) => order.history![0].status === 'PENDING'
  );
  const inProgressOrders = orders.filter(
    (order) => order.history![0].status === 'PROGRESS'
  );
  const completedOrders = orders.filter(
    (order) => order.history![0].status === 'COMPLETED'
  );
  const canceledOrders = orders.filter(
    (order) => order.history![0].status === 'CANCELED'
  );

  const salesData = orders.reduce((acc, order) => {
    if (order.history![0].status === 'COMPLETED') {
      const month = new Date(order.deadline).toLocaleString('default', {
        month: 'short',
      });
      acc[month] = (acc[month] || 0) + order.quantity;
    }
    return acc;
  }, {} as Record<string, number>);

  const salesChartData = Object.entries(salesData).map(([month, quantity]) => ({
    month,
    quantity,
  }));

  return (
    <Flex flexDir={'column'} gap={'2rem'}>
      <Container>
        <Tabs>
          <TabList>
            <Tab>
              Pending
              <Tag size={'sm'} variant="solid" colorScheme="blue" ml={'10px'}>
                {pendingOrders.length}
              </Tag>
            </Tab>
            <Tab>
              In Progress
              <Tag size={'sm'} variant="solid" colorScheme="yellow" ml={'10px'}>
                {inProgressOrders.length}
              </Tag>
            </Tab>
            <Tab>
              Completed
              <Tag size={'sm'} variant="solid" colorScheme="green" ml={'10px'}>
                {completedOrders.length}
              </Tag>
            </Tab>
            <Tab>
              Canceled
              <Tag size={'sm'} variant="solid" colorScheme="red" ml={'10px'}>
                {canceledOrders.length}
              </Tag>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <OrderTable orders={pendingOrders} />
            </TabPanel>
            <TabPanel p={0}>
              <OrderTable orders={inProgressOrders} />
            </TabPanel>
            <TabPanel p={0}>
              <OrderTable orders={completedOrders} />
            </TabPanel>
            <TabPanel p={0}>
              <OrderTable orders={canceledOrders} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

      <Container>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Operator</Th>
                <Th>Product</Th>
                <Th>Quantity</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.operator.username}</Td>
                  <Td>{order.product_name}</Td>
                  <Td>{order.quantity}</Td>
                  <Td>
                    <Tag
                      size={'sm'}
                      variant="solid"
                      colorScheme={
                        order.history![0].status === 'PENDING'
                          ? 'blue'
                          : order.history![0].status === 'PROGRESS'
                          ? 'yellow'
                          : order.history![0].status === 'COMPLETED'
                          ? 'green'
                          : 'red'
                      }
                    >
                      {order.history![0].status}
                    </Tag>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>

      <Container>
        <h2>Sales Report (Monthly)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
      </Container>
    </Flex>
  );
}

function OrderTable({ orders }: { orders: OrderType[] }) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.product_name}</Td>
                <Td>{order.quantity}</Td>
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
  );
}
