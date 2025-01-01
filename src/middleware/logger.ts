import { Request, Response, NextFunction } from "express";
// import colors from "colors";
import "colors";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const methodColors: Record<string, string> = {
    GET: "green",
    POST: "blue",
    PUT: "yellow",
    DELETE: "red",
  };

  const color = methodColors[req.method] || "white";

  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[
      color as keyof typeof String.prototype
    ]
  );
  next();
};

export default logger;
