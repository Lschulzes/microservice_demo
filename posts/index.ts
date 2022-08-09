import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts: { [key: string]: { id: string; title: string } } = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => console.log("Listening on port 4000"));
