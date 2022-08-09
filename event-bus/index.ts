import axios from "axios";
import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/events", (req, res) => {
  const event = req.body;

  axios
    .post("http://localhost:4000/events", event)
    .catch((err) => console.error(err.code));

  axios
    .post("http://localhost:4001/events", event)
    .catch((err) => console.error(err.code));

  axios
    .post("http://localhost:4002/events", event)
    .catch((err) => console.error(err.code));

  axios
    .post("http://localhost:4003/events", event)
    .catch((err) => console.error(err.code));

  res.send({ status: "OK" });
});

app.listen(4242, () => console.log("Listening on port 4242"));
