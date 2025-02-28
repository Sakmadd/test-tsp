class LoginDto {
  email: string;
  password: string;
  constructor({ email, password }: LoginDto) {
    this.email = email;
    this.password = password;
  }
}

export default LoginDto;
