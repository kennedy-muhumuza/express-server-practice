import express, { Request, Response } from "express";

const router = express.Router();

let posts = [
  { id: 1, title: "title one" },
  { id: 2, title: "title two" },
  { id: 3, title: "title three" },
  { id: 4, title: "title four" },
];

router.get("/", (req: Request, res: Response) => {
  // console.log(req.query)
  const limitParam = req.query.limit;

  const limit = typeof limitParam === "string" ? parseInt(limitParam, 10) : NaN;

  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  }

  if (isNaN(limit)) {
    res.status(200).json(posts);
  }
});

// Get a single post
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404).json({ msg: `A post with is of ${id} was not found` });
    return;
  }

  if (post) {
    res.status(200).json(post);
  }
});

// router.get("/", (req: Request, res: Response) => {
//   res.send("Hello, TypeScript World!");
// });

router.get("/about", (req: Request, res: Response) => {
  res.send("About Page");
});

export default router;
// export { router as postRoutes };
