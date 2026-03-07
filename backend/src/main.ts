import express from "express";
import { createServer } from "http";
import { initWss } from "./wss.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes

const server = createServer(app);
// server.setTimeout(10 * 60 * 1000); //timeout at 10 minutes
const port = 4000;
server.listen(port, async () => {
  initWss(server);

  console.log(`Backend online! Listening at http://localhost:${port}`);
  console.log(`-----------------------------------------`);
});
