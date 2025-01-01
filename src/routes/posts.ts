import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "../middleware/error";

const router = express.Router();

let posts = [
  { id: 1, title: "title one" },
  { id: 2, title: "title two" },
  { id: 3, title: "title three" },
  { id: 4, title: "title four" },
];

// Get all posts
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.query)
  const limitParam = req.query.limit;

  const limit = typeof limitParam === "string" ? parseInt(limitParam, 10) : NaN;

  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
    return;
  }

  if (isNaN(limit)) {
    res.status(200).json(posts);
  }
});

// Get a single post
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    // res.status(404).json({ msg: `A post with is of ${id} was not found` });
    const error: CustomError = new Error(
      `A post with is of ${id} was not found`
    );
    error.status = 404;
    return next(error);
  }

  if (post) {
    res.status(200).json(post);
  }
});

// router.get("/", (req: Request, res: Response) => {
//   res.send("Hello, TypeScript World!");
// });

// Create a new post
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const newPost = { id: posts.length + 1, title: req.body.title };

  if (!newPost.title) {
    // res.status(400).json({ msg: "Please include a title" });

    const error: CustomError = new Error("Please include a title");
    error.status = 400;
    return next(error);
  }
  posts.push(newPost);
  res.status(201).json(posts);
});

//Update post
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error: CustomError = new Error(
      `A post with is of ${id} was not found`
    );
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
});

//Delete post
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error: CustomError = new Error(
      `A post with is of ${id} was not found`
    );
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export { router };
