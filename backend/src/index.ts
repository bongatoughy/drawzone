import moment from "moment";
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import {
  login,
  register,
  saveRefreshToken,
  retrieveRefreshTokenRecord,
  deleteRefreshToken,
} from "./services";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";

config();

const app = express();

app.use(cors());
app.use(json());
app.use(cookieParser());

const generateToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });

const generateRefreshToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const persistRefreshToken = async (token, email) => {};

const verifyToken = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  return jwt.verify(token, process.env.JWT_PUBLIC_KEY);
};

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await register(email, password);
    const token = generateToken({ email });
    const refreshToken = uuidv4();
    await saveRefreshToken(refreshToken, email);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      expires: moment().add(24, "hours").toDate(),
    });
    res.send({ user, token });
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
    const token = generateToken({ email });
    const refreshToken = await persistRefreshToken(token, user.email);
    res.cookie("refresh_token", refreshToken, { httpOnly: true });
    res.send({ user, token });
  } catch (e) {
    res.status(401).send(`Login attempt was unsuccessful. Please try again.`);
  }
});

app.get("/refresh_token", verifyToken, async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  const email = await retrieveRefreshTokenRecord(refreshToken);
  const newRefreshToken = uuidv4();
  const newToken = generateToken({ email });
  await deleteRefreshToken(refreshToken);
  await saveRefreshToken(newRefreshToken, email);
  res.cookie("refresh_token", newRefreshToken, { httpOnly: true });
  res.send({ user: { email }, token: newToken });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
