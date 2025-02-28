import { z } from 'zod';

export const OrderSchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  quantity: z.number().int().positive('Quantity must be a positive integer.'),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message:
      'Deadline must be a valid ISO-8601 date string (e.g., 2025-03-01T12:00:00Z).',
  }),
  operatorId: z.string().uuid('Operator ID must be a valid UUID.'),
});
