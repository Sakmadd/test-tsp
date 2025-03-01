import { PrismaClient } from '@prisma/client';
import { UserType } from '../types/userType';

const prisma = new PrismaClient();

class UserService {
  async getOperators(): Promise<UserType[]> {
    const operators: UserType[] = await prisma.user.findMany({
      where: {
        role: {
          equals: 'OP',
        },
      },
    });

    operators.map((operator) => {
      delete operator.password;
      delete operator.role;
    });

    return operators;
  }
}

export default new UserService();
