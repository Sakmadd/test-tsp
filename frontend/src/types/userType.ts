import { Role } from './roleEnum';

export type UserType = {
  id: string;
  email: string;
  username: string;
  password?: string;
  role: Role;
};
