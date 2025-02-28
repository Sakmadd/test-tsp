class ResponseDTO<T> {
  error: boolean;
  message: string;
  data: T | null;

  constructor({ error, message, data }: ResponseDTO<T>) {
    this.error = error;
    this.message = message;
    this.data = data;
  }
}

export default ResponseDTO;
