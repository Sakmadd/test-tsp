import ResponseDTO from '../dto/ResponseDto';
import userService from '../service/userService';
import { Request, Response } from 'express';
import { OrderType } from '../types/orderType';
import { UserType } from '../types/userType';
import { errorParser } from '../utils/errorParser';

class UserController {
  async getOperators(req: Request, res: Response) {
    try {
      const payload = await userService.getOperators();

      res.status(201).json(
        new ResponseDTO<UserType[]>({
          data: payload,
          message: 'Order created successfully',
          error: false,
        })
      );
    } catch (error: any) {
      res.status(400).json(
        new ResponseDTO<null>({
          data: null,
          message: errorParser(error),
          error: true,
        })
      );
    }
  }
}
export default new UserController();
