import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.get("/", (_, res) => {
  res.send("testing");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
