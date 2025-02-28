import { Role } from '@prisma/client';

class UserRegisterDTO {
  username: string;
  email: string;
  password: string;
  role: Role;

  constructor({ username, email, password, role }: UserRegisterDTO) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = role;
  }
}

export default UserRegisterDTO;
