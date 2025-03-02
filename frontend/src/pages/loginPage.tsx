'use client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useLogin } from '../hooks/useLogin';

export default function LoginPage() {
  const { errors, handleSubmit, isValid, onSubmit, register, navigate } =
    useLogin();

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password')} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'center'}
                >
                  <Text
                    color={'blue.400'}
                    cursor={'pointer'}
                    onClick={() => navigate('/register')}
                  >
                    Create an account?
                  </Text>
                </Stack>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{ bg: 'blue.500' }}
                  isDisabled={!isValid}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
