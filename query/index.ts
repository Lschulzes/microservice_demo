import { EventBusBody, Comment } from "./../interfaces/index";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

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

const handleEvent = (event: EventBusBody) => {
  const { type, data }: EventBusBody = event;

  switch (type) {
    case "PostCreated":
      posts.push({ ...data, comments: [] });
      break;
    case "CommentUpdated":
    case "CommentCreated":
      const { content, id, postId, status } = data;
      const index = posts.findIndex((post) => post.id === postId);
      if (index < 0) throw new Error("Not found!");

      posts[index] = {
        ...posts[index],
        comments: posts[index].comments
          .filter((comment) => comment.id !== id)
          .concat([{ id, content, status }]),
      };
      break;
  }
};

app.post("/events", (req, res) => {
  try {
    const event: EventBusBody = req.body;

    handleEvent(event);

    res.status(200).send("OK");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(4002, async () => {
  console.log("Listening on port 4002");
  const { data } = await axios.get("http://localhost:4242/events");

  for (const event of data) handleEvent(event);
});
