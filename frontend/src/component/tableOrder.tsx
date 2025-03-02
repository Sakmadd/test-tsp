import {
  Button,
  Divider,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import { Container } from '../component/container';
import { useTableOrder } from '../hooks/useTableOrder';
import { formatDateFromString } from '../utils/formatDate';
import { statusColorMap } from '../utils/statusColor';

export function TableOrder() {
  const {
    filteredOrders,
    navigate,
    startDate,
    endDate,
    selectedStatus,
    setStartDate,
    setEndDate,
    setSelectedStatus,
  } = useTableOrder();

  return (
    <>
      <Flex flexDir={'column'} gap={'2rem'}>
        <Container>
          <Heading size="md" mb={4} textAlign="center">
            Filter Orders
          </Heading>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            <GridItem>
              <FormLabel>Start From Date</FormLabel>
              <Input
                placeholder="Start Date"
                size="md"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                borderColor="gray.300"
                focusBorderColor="teal.500"
              />
            </GridItem>

            <GridItem>
              <FormLabel>Until Date</FormLabel>
              <Input
                placeholder="End Date"
                size="md"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                borderColor="gray.300"
                focusBorderColor="teal.500"
              />
            </GridItem>

            <GridItem>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="All"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                borderColor="gray.300"
                focusBorderColor="teal.500"
              >
                <option value="pending">PENDING</option>
                <option value="progress">PROGRESS</option>
                <option value="completed">COMPLETED</option>
                <option value="canceled">CANCELED</option>
              </Select>
            </GridItem>
          </Grid>

          <Divider my={4} />

          <Flex justify="center">
            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => navigate('/order/create')}
            >
              Add Order
            </Button>
          </Flex>
        </Container>
        <Container>
          <TableContainer>
            <Table variant="simple">
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
