export class BadRequestException extends Error {
  code = 400;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundException';
  }
}
