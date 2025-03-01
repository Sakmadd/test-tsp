import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../network/api';
import { RootState } from '../redux/store';
import { HistoryForm, Status } from '../types/formType';

export function CreateHistoryPage() {
  const loggedUser = useSelector((state: RootState) => state.loggedUser.value);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm<HistoryForm>({
    defaultValues: {
      orderId: id || '',
      description: '',
      status: 'PENDING',
    },
  });

  const onSubmit = (data: HistoryForm) => {
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

  return (
    <Box
      maxW="xl"
      mx="auto"
      mt={10}
      p={6}
      boxShadow="lg"
      borderRadius="md"
      bg={'white'}
    >
      <Heading size="lg" textAlign="center" mb={6}>
        Add History
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Flex justifyContent={'center'}>
            <RadioGroup
              value={watch('status')}
              onChange={(value) => setValue('status', value as Status)}
            >
              <Stack spacing={5} direction="row">
                <Radio colorScheme="blue" value="PENDING">
                  PENDING
                </Radio>
                <Radio colorScheme="yellow" value="PROGRESS">
                  PROGRESS
                </Radio>
                <Radio colorScheme="green" value="COMPLETED">
                  COMPLETED
                </Radio>
                {loggedUser!.role == 'PM' && (
                  <Radio colorScheme="red" value="CANCELED">
                    CANCELED
                  </Radio>
                )}
              </Stack>
            </RadioGroup>
          </Flex>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              {...register('description', { required: true })}
              placeholder="Enter history details..."
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit History
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
