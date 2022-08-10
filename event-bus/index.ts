import { EventBusBody } from "./interfaces/index";
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const events: Array<EventBusBody> = [];

app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  console.log({ event });
  events.push(event);

  axios
    .post("http://posts-clusterip-srv:4000/events", event)
    .catch((err) => console.error(err.code));

  axios
    .post("http://comments-srv:4001/events", event)
    .catch((err) => console.error(err.code));

  axios
    .post("http://query-srv:4002/events", event)
    .catch((err) => console.error(err.code));

  axios
    .post("http://moderation-srv:4003/events", event)
    .catch((err) => console.error(err.code));

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4242, () => console.log("Listening on port 4242"));
