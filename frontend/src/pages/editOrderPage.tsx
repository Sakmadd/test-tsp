import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Tag,
} from '@chakra-ui/react';

import { FaEdit } from 'react-icons/fa';
import { useEditOrder } from '../hooks/useEditOrder';
import { statusColorMap } from '../utils/statusColor';

export function EditOrderPage() {
  const { handleSubmit, onSubmit, operators, order, register, navigate } =
    useEditOrder();

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input type="text" {...register('productName')} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Quantity</FormLabel>
            <NumberInput min={1} defaultValue={order.quantity}>
              <NumberInputField
                {...register('quantity', { valueAsNumber: true })}
              />
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Deadline</FormLabel>
            <Input type="date" {...register('deadline')} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Operator</FormLabel>
            <Select {...register('operatorId')}>
              {operators.map((operator) => (
                <option key={operator.id} value={operator.id}>
                  {operator.username}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Flex alignItems={'center'}>
              <Tag
                size="md"
                variant="solid"
                colorScheme={statusColorMap[order.history![0].status] || 'gray'}
              >
                {order.history?.[0]?.status}
              </Tag>
              <Button
                variant={'ghost'}
                m={0}
                onClick={() => navigate('/order/history/' + order.id)}
              >
                <FaEdit />
              </Button>
            </Flex>
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
