import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useHistory } from '../hooks/useHistory';
import { Status } from '../types/formType';

export function CreateHistoryPage() {
  const {
    handleSubmit,
    loggedUser,
    onSubmit,
    register,
    setQuantity,
    setValue,
    watch,
  } = useHistory();

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

          <FormControl>
            <FormLabel>Change Quantity</FormLabel>
            <NumberInput min={1}>
              <NumberInputField
                onChange={(e) => setQuantity(+e.target.value)}
              />
            </NumberInput>
          </FormControl>

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
