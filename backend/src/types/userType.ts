import { Role } from '@prisma/client';

export type UserType = {
  id: string;
  email: string;
  username: string;
  password?: string;
  role: Role;
};
