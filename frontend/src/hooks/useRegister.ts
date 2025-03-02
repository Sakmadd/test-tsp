'use client';

import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import api from '../network/api';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function useRegister() {
  const toast = useToast();
  const [value, setValue] = useState('OP');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterFormInputs) => {
    const req = {
      ...data,
      role: value,
    };

    api
      .REGISTER(req)
      .then(() => {
        toast({
          title: 'Registrasi Berhasil',
          description: 'Akun Anda telah berhasil dibuat.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/login');
      })
      .catch((error) => {
        toast({
          title: 'Registrasi Gagal',
          description: 'Terjadi kesalahan. Silakan coba lagi.',
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
    showPassword,
    setShowPassword,
    value,
    setValue,
    onSubmit,
    navigate,
  };
}
