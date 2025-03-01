import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../network/api';
import { RootState } from '../redux/store';
import { HistoryForm } from '../types/formType';

export function useHistory() {
  const loggedUser = useSelector((state: RootState) => state.loggedUser.value);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [quantiy, setQuantity] = useState<number>();
  const { register, handleSubmit, setValue, watch } = useForm<HistoryForm>({
    defaultValues: {
      orderId: id || '',
      description: '',
      status: 'PENDING',
    },
  });

  const onSubmit = (data: HistoryForm) => {
    if (quantiy) {
      console.log(quantiy);
      api.CHANGE_QUANTITY(id!, quantiy);
    }

    api.ADD_HISTORY(data).then(() => {
      navigate('/order/edit/' + id);
    });

    toast({
      title: 'Success',
      description: 'History entry has been added successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    setQuantity,
    onSubmit,
    loggedUser,
  };
}
