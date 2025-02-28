class NotFoundException extends Error {
  code = 404;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundException';
  }
}
