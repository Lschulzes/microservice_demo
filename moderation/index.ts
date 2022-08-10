import { CommentStatus, EventBusBody } from "./interfaces/index";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(bodyParser.json());

app.post("/events", (req, _res) => {
  const { type, data }: EventBusBody = req.body;
  console.log(type);

  if (type === "CommentCreated") {
    const status: CommentStatus = data.content.includes("orange")
      ? "rejected"
      : "approved";

    axios
      .post("http://event-bus-srv:4242/events", {
        type: "CommentModerated",
        data: { ...data, status },
      } as EventBusBody)
      .catch((err) => console.error(err.code));
  }
});

app.listen(4003, () => console.log("Listening on port 4003"));
