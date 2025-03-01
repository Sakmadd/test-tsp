import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
  Tag,
  Flex,
} from '@chakra-ui/react';

import { OrderType } from '../types/orderType';
import api from '../network/api';
import { UserType } from '../types/userType';
import { FaEdit } from 'react-icons/fa';
import { OrderEdit } from '../types/OrderEditType';

export function EditOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [operators, setOperators] = useState<UserType[]>([]);

  const { register, handleSubmit, setValue } = useForm<OrderEdit>();

  useEffect(() => {
    async function init() {
      const orderData = await api.GET_ORDER(id!);
      const operatorsData = await api.GET_OPERATORS();
      setOrder(orderData);
      setOperators(operatorsData);

      // Set nilai default untuk form
      setValue('productName', orderData.product_name);
      setValue('quantity', orderData.quantity);
      setValue('deadline', orderData.deadline.split('T')[0]);
      setValue('operatorId', orderData.operator_id);
      setValue('id', orderData.id);
    }
    init();
  }, [id, setValue]);

  const onSubmit = async (formValues: OrderEdit) => {
    try {
      await api.EDIT_ORDER(formValues);
      toast({
        title: 'Success',
        description: 'Order has been updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/order');
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update order.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
              <Tag size={'md'} variant="solid" colorScheme="teal">
                {order.history ? order.history[0].status : 'Unknown'}
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
