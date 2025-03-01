import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Heading,
  useToast,
  Select,
} from '@chakra-ui/react';
import { UserType } from '../types/userType';
import { Role } from '../types/roleEnum';
import { OrderType } from '../types/orderType';

const dummyOrders: OrderType[] = [
  {
    id: '1',
    product_name: 'Product A',
    quantity: 10,
    deadline: new Date('2025-03-10'),
    operator_id: 'op1',
  },
  {
    id: '2',
    product_name: 'Product B',
    quantity: 5,
    deadline: new Date('2025-03-15'),
    operator_id: 'op2',
  },
];

const operators: UserType[] = [
  { id: 'op1', username: 'johndoe', email: 'test@gmail.com', role: Role.OP },
  { id: 'op2', username: 'janesmith', email: 'test@gmail.com', role: Role.OP },
  { id: 'op3', username: 'alice', email: 'test@gmail.com', role: Role.OP },
];

export function EditOrderPage() {
  const { orderId } = useParams();
  const toast = useToast();
  const [order, setOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    const foundOrder = dummyOrders.find((o) => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (order) {
      setOrder({ ...order, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !order ||
      !order.product_name ||
      !order.deadline ||
      !order.operator_id
    ) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log('Order Updated:', order);

    toast({
      title: 'Success',
      description: 'Order has been updated successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (!order) {
    return (
      <Heading textAlign="center" mt={10}>
        Order not found
      </Heading>
    );
  }

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      boxShadow="lg"
      borderRadius="md"
      bg={'white'}
    >
      <Heading size="lg" textAlign="center" mb={6}>
        Edit Order
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
              type="text"
              name="product_name"
              value={order.product_name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Quantity</FormLabel>
            <NumberInput min={1}>
              <NumberInputField
                name="quantity"
                value={order.quantity}
                onChange={handleChange}
              />
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Deadline</FormLabel>
            <Input
              type="date"
              name="deadline"
              value={order.deadline.toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Operator</FormLabel>
            <Select
              name="operator_id"
              value={order.operator_id}
              onChange={handleChange}
            >
              {operators.map((operator) => (
                <option key={operator.id} value={operator.id}>
                  {operator.username}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
