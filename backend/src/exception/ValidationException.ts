import { BadRequestException } from './BadRequestExpcetion';

export class ValidationException extends BadRequestException {
  errors: { field: string; message: string }[];

  constructor(errors: { field: string; message: string }[]) {
    super('Validation Error');
    this.errors = errors;
  }
}
