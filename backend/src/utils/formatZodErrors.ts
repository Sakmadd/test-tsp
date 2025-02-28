import { ZodError } from 'zod';
import { BadRequestException } from '../exception/BadRequestExpcetion';
import { ValidationException } from '../exception/ValidationException';

/**
 * Formats Zod validation errors into a user-friendly structure.
 * @param error ZodError object
 * @returns Formatted error messages
 */
export function formatZodErrors(error: ZodError) {
  const formattedErrors = error.errors
    .map((err) => `field:${err.path.join('.')}, message: ${err.message}`)
    .join(' / ');
  throw new BadRequestException(formattedErrors);
}
