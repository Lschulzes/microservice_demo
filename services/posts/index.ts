import { EventBusBody } from "./interfaces/index";
import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts: { [key: string]: { id: string; title: string } } = {};

app.get("/posts", (_req, res) => {
  res.status(200).send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  axios.post("http://event-bus-srv:4242/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  } as EventBusBody);

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log(req.body.type);
});

app.listen(4000, () => {
  console.log("Posts Service running really fastly 🏃🏃🏃!");
  console.log("Listening on port 4000");
});
