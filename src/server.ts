import express from "express";
// import { postRoutes } from "./routes/posts";
import { posts } from "./routes/posts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/posts", posts);
// Get all posts

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
