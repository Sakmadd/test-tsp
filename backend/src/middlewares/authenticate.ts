import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../configs/config';
import { UserType } from '../types/userType';

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  jwt.verify(token, CONFIG.SECRET_SAUCE!, (error, user) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.locals.user = user as UserType;
    next();
  });
}
