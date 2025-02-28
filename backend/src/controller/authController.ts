import { UserType } from '../types/userType';
import ResponseDTO from '../dto/ResponseDto';
import authService from '../service/authService';
import { Request, Response } from 'express';
import { errorParser } from '../utils/errorParser';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, role } = req.body;

      const payload: UserType = await authService.register({
        email,
        username,
        password,
        role,
      });

      delete payload!.password;

      res.status(200).json(
        new ResponseDTO<UserType>({
          message: 'User registered successfully',
          data: payload,
          error: false,
        })
      );
    } catch (error: any) {
      res.status(error.code).json(
        new ResponseDTO<null>({
          message: errorParser(error),
          data: null,
          error: true,
        })
      );
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const payload: string = await authService.login({
        email,
        password,
      });

      res.status(200).json(
        new ResponseDTO<{ token: string }>({
          error: false,
          message: 'User logged in successfully',
          data: {
            token: payload,
          },
        })
      );
    } catch (error: any) {
      res.status(error.code).json(
        new ResponseDTO<null>({
          message: errorParser(error),
          data: null,
          error: true,
        })
      );
    }
  }
}

export default new AuthController();
