import { NextFunction, Request, Response } from "express";
import { CustomError } from "./error";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error(`Not Found`);
  error.status = 404;
  return next(error);
};

export default notFound;
