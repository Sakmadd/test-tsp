export function errorParser(error: any): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}
