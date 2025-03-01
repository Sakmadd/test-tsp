import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useOrder } from '../hooks/useOrder';

export function CreateOrderPage() {
  const { handleChange, handleSubmit, operators, order } = useOrder();

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
              {operators
                ? operators.map((operator) => (
                    <option key={operator.id} value={operator.id}>
                      {operator.username}
                    </option>
                  ))
                : null}
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
