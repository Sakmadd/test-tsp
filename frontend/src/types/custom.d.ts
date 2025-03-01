import { UserType } from './userType';

declare global {
  namespace Express {
    interface Locals {
      user?: UserType;
    }
  }
}
