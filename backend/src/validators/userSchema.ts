import { z } from 'zod';
import { Role } from '@prisma/client';

export const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(20, { message: 'Username cannot exceed 20 characters.' }),
  email: z.string().email({ message: 'Invalid email format.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(50, { message: 'Password cannot exceed 50 characters.' }),

  role: z.nativeEnum(Role, { message: 'Role must be either PM or OP.' }),
});
