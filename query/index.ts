import { Comment, EventBusBody } from "../interfaces/index";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts: Array<{
  id: string;
  title: string;
  comments: Array<Comment>;
}> = [];

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).send(posts.find((post) => post.id === req.params.id));
});

app.get("/posts", (_req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const event: EventBusBody = req.body;

  switch (event.type) {
    case "PostCreated":
      posts.push({ ...event.data, comments: [] });
      break;
    case "CommentCreated":
      const { content, id, postId, status } = event.data;
      const index = posts.findIndex((post) => post.id === postId);
      if (index < 0) return res.status(404);

      posts[index] = {
        ...posts[index],
        comments: posts[index].comments.concat([{ id, content, status }]),
      };
      break;
  }

  res.status(200).send("OK");
});

app.listen(4002, () => console.log("Listening on port 4002"));
