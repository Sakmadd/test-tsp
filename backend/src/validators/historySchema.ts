import { z } from 'zod';
import { Status } from '@prisma/client';

export const HistorySchema = z.object({
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long.'),
  status: z.nativeEnum(Status, { message: 'Invalid status value.' }),
});
