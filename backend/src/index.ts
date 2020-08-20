import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { login, register } from "./services";

config();

const app = express();

app.use(cors());
app.use(json());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await register(email, password);
    res.send(user);
  } catch (e) {
    res
      .status(400)
      .send(
        [
          `Encountered an error, please try again. `,
          `If error persists please use a different `,
          `email address.`,
        ].join("")
      );
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    res.send(user);
  } catch (e) {
    res.status(401).send(`Login attempt was unsuccessful. Please try again.`);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
