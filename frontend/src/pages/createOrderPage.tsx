import { useState } from 'react';
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

const operators: UserType[] = [
  { id: 'op1', username: 'johndoe', email: 'test@gmail.com', role: Role.OP },
  { id: 'op2', username: 'janesmith', email: 'test@gmail.com', role: Role.OP },
  { id: 'op3', username: 'alice', email: 'test@gmail.com', role: Role.OP },
];

export function CreateOrderPage() {
  const [order, setOrder] = useState({
    productName: '',
    quantity: 1,
    deadline: '',
    operatorId: '',
  });

  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!order.productName || !order.deadline || !order.operatorId) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log('Order Submitted:', order);

    toast({
      title: 'Success',
      description: 'Order has been created successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setOrder({
      productName: '',
      quantity: 1,
      deadline: '',
      operatorId: '',
    });
  };

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
        Create New Order
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
              type="text"
              name="productName"
              value={order.productName}
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
              value={order.deadline}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Operator</FormLabel>
            <Select
              name="operatorId"
              value={order.operatorId}
              onChange={handleChange}
              placeholder="Select Operator"
            >
              {operators.map((operator) => (
                <option key={operator.id} value={operator.id}>
                  {operator.username}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit Order
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
