import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error -->", err);

  res.status(400).send({ message: err.message || "Something went wrong" });
};
