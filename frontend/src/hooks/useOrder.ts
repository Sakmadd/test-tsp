import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../network/api';
import { UserType } from '../types/userType';

export function useOrder() {
  const navigate = useNavigate();
  const [operators, setOperators] = useState<UserType[]>();
  useEffect(() => {
    async function init() {
      const operators = await api.GET_OPERATORS();
      setOperators(operators);
    }
    init();
  });

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

    api.CREATE_ORDER(order).then(() => navigate('/order'));
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

  return {
    operators,
    handleChange,
    handleSubmit,
    order,
  };
}
