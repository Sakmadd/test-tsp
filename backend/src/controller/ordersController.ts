import ResponseDTO from '../dto/ResponseDto';
import ordersService from '../service/ordersService';
import { OrderType } from '../types/orderType';
import { UserType } from '../types/userType';
import { Request, Response } from 'express';
import { errorParser } from '../utils/errorParser';
import { HistoryType } from '../types/historyType';

class OrdersController {
  async create(req: Request, res: Response) {
    try {
      const loggedUser: UserType | undefined = res.locals.user;
      if (loggedUser!.role !== 'PM') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const payload: OrderType = await ordersService.create(req.body);
      res.status(201).json(
        new ResponseDTO<OrderType>({
          data: payload,
          message: 'Order created successfully',
          error: false,
        })
      );
    } catch (error: any) {
      res.status(error.code).json(
        new ResponseDTO<null>({
          data: null,
          message: errorParser(error),
          error: true,
        })
      );
    }
  }

  async update(req: Request, res: Response) {
    try {
      const loggedUser: UserType | undefined = res.locals.user;
      if (loggedUser!.role !== 'PM') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const payload: OrderType = await ordersService.update(req.body);
      res.status(201).json(
        new ResponseDTO<OrderType>({
          data: payload,
          message: 'Order updated successfully',
          error: false,
        })
      );
    } catch (error: any) {
      res.status(error.code).json(
        new ResponseDTO<null>({
          data: null,
          message: errorParser(error),
          error: true,
        })
      );
    }
  }

  async getTaskOP(req: Request, res: Response) {
    try {
      const loggedUser: UserType | undefined = res.locals.user;
      const payload: OrderType[] = await ordersService.getTaskOP(
        loggedUser!.id
      );
      res.status(200).json(
        new ResponseDTO<OrderType[]>({
          data: payload,
          message: 'Task fetched successfully',
          error: false,
        })
      );
    } catch (error: any) {
      res.status(error.code).json(
        new ResponseDTO<null>({
          data: null,
          message: errorParser(error),
          error: true,
        })
      );
    }
  }

  async getTaskPM(req: Request, res: Response) {
    try {
      const loggedUser: UserType | undefined = res.locals.user;
      if (loggedUser!.role !== 'PM') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const payload: OrderType[] = await ordersService.getTaskPM();
      res.status(200).json(
        new ResponseDTO<OrderType[]>({
          data: payload,
          message: 'Task fetched successfully',
          error: false,
        })
      );
    } catch (error: any) {
      res.status(error.code).json(
        new ResponseDTO<null>({
          data: null,
          message: errorParser(error),
          error: true,
        })
      );
    }
  }

  async createHistory(req: Request, res: Response) {
    try {
      const payload = await ordersService.createHistory(req.body);
      res.status(201).json(
        new ResponseDTO<HistoryType>({
          data: payload,
          message: 'History created successfully',
          error: false,
        })
      );
    } catch (error: any) {
      res.status(error.code).json(
        new ResponseDTO<null>({
          data: null,
          message: errorParser(error),
          error: true,
        })
      );
    }
  }
}

export default new OrdersController();
