import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../network/api';
import { OrderEdit } from '../types/OrderEditType';
import { OrderType } from '../types/orderType';
import { UserType } from '../types/userType';

export function useEditOrder() {
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

  return {
    order,
    operators,
    register,
    handleSubmit,
    onSubmit,
    navigate,
  };
}
