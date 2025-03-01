import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { HistoryType } from '../types/historyType';

export function CreateHistoryPage() {
  const { orderId } = useParams();
  const toast = useToast();

  const [history, setHistory] = useState<HistoryType>({
    id: '',
    order_id: orderId || '',
    description: '',
    timestamp: new Date(),
    status: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHistory({ ...history, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!history.description) {
      toast({
        title: 'Error',
        description: 'Description cannot be empty.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log('History Submitted:', history);

    toast({
      title: 'Success',
      description: 'History entry has been added successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Reset form
    setHistory({
      id: '',
      order_id: orderId || '',
      description: '',
      timestamp: new Date(),
      status: '',
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
        Add History
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Order ID</FormLabel>
            <Input
              type="text"
              name="order_id"
              value={history.order_id}
              isReadOnly
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={history.description}
              onChange={handleChange}
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
