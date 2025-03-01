import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../configs/config';
import LoginDto from '../dto/request/UserLoginRequest';
import UserRegisterDTO from '../dto/request/UserRegisterRequest';
import { BadRequestException } from '../exception/BadRequestExpcetion';
import { UserType } from '../types/userType';
import Hasher from '../utils/Hasher';
import { userSchema } from '../validators/userSchema';
import { formatZodErrors } from '../utils/formatZodErrors';

const prisma = new PrismaClient();

class AuthServices {
  async register(registerDTO: UserRegisterDTO): Promise<UserType> {
    const { success, error } = userSchema.safeParse(registerDTO);

    if (!success) {
      formatZodErrors(error);
    }

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: registerDTO.email,
      },
    });

    if (isUserExist) {
      throw new BadRequestException('User already exists.');
    }

    const user: UserType = await prisma.user.create({
      data: {
        ...registerDTO,
        password: await Hasher.hashPassword(registerDTO.password),
      },
    });

    delete user.password;
    return user;
  }

  async login(LoginDto: LoginDto): Promise<string> {
    console.log(LoginDto);

    const requestedUser: UserType | null = await prisma.user.findUnique({
      where: {
        email: LoginDto.email,
      },
    });

    if (!requestedUser) {
      throw new BadRequestException('The username/password was incorrect.');
    }

    const isPasswordValid = await Hasher.comparePassword(
      LoginDto.password,
      requestedUser.password!
    );

    if (!isPasswordValid) {
      throw new BadRequestException('The username/password was incorrect.');
    }

    delete requestedUser.password;

    const token = jwt.sign(requestedUser, CONFIG.SECRET_SAUCE!);

    return token;
  }

  async getLoggedUser(token: string): Promise<UserType> {
    const user = jwt.verify(token, CONFIG.SECRET_SAUCE!);
    return user as UserType;
  }
}

export default new AuthServices();
