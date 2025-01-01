// import express from "express";
import express, { NextFunction, Request, Response } from "express";
// import { postRoutes } from "./routes/posts";
import path from "path";
import { router } from "./routes/posts";
import logger from "./middleware/logger";
import errorHandler, { CustomError } from "./middleware/error";
import notFound from "./middleware/notFound";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts/", router);

// logger middleware
app.use(logger);

app.use(notFound);
// error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
