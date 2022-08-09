import { Comment, EventBusBody } from "./../interfaces/index";
import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId: {
  [postId: string]: Array<Comment>;
} = {};

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  axios.post("http://localhost:4242/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      postId: req.params.id,
      status: "pending",
    },
  } as EventBusBody);

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data }: EventBusBody = req.body;

  if (type === "CommentModerated") {
    const { id, postId, status } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    if (comment) comment.status = status;

    await axios.post("http://localhost:4242/events", {
      type: "CommentUpdated",
      data: { ...comment, postId },
    } as EventBusBody);
  }
});

app.listen(4001, () => console.log("Listening on port 4001"));
