'use client';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import api from '../network/api';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function useLogin() {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormInputs) => {
    api
      .LOGIN(data)
      .then(() => {
        toast({
          title: 'Login Berhasil',
          description: 'Anda telah berhasil masuk.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/');
        navigate(0);
      })
      .catch((error) => {
        toast({
          title: 'Login Gagal',
          description: 'Email atau password salah. Silakan coba lagi.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.error(error);
      });
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
    navigate,
  };
}
