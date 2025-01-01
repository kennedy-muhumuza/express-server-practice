import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.status) {
    res.status(error.status).json({ msg: error.message });
  } else {
    res.status(500).json({ msg: error.message });
  }
};

export default errorHandler;
