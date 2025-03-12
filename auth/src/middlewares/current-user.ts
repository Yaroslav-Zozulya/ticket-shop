import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IUserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

export const currentUser = (req: Request, _: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    req.currentUser = payload as IUserPayload;
  } catch (err) {}

  next();
};
