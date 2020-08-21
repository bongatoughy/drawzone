import { pool } from "./db-client";
import { hash, compareSync } from "bcrypt";

const QUERIES = {
  REGISTER: `
    INSERT INTO users (
      email,
      password
    )
    VALUES (
      $1,
      $2
    )
    RETURNING id, email;
  `,
  LOGIN: `
    SELECT * FROM users
    WHERE email = $1
  `,
  SAVE_REFRESH_TOKEN: `
    INSERT INTO refresh_tokens (
      token,
      email
    )
    VALUES (
      $1,
      $2
    )
  `,
  RETRIEVE_REFRESH_TOKEN: `
    SELECT * from refresh_tokens
    WHERE token = $1
  `,
  DELETE_REFRESH_TOKEN: `
    DELETE FROM refresh_tokens
    WHERE email = $1;
  `,
};

export const register = async (email, password) => {
  const pwHash = await hash(password, 10);
  const dbResponse = await pool.query(QUERIES.REGISTER, [email, pwHash]);
  if (dbResponse.rowCount === 1) {
    return dbResponse.rows[0];
  } else {
    throw `Too many records returned`;
  }
};

const retrieveUser = async (email) => {
  const dbResponse = await pool.query(QUERIES.LOGIN, [email]);
  if (dbResponse.rowCount === 1) {
    return dbResponse.rows[0];
  } else {
    throw `Invalid login credentials.`;
  }
};

export const login = async (rawEmail, rawPassword) => {
  const { id, email, password } = await retrieveUser(rawEmail);
  const match = compareSync(rawPassword, password);
  if (match) {
    return { id, email };
  } else {
    throw `Invalid login credentials.`;
  }
};

export const saveRefreshToken = async (refreshToken, email) => {
  await pool.query(QUERIES.SAVE_REFRESH_TOKEN, [refreshToken, email]);
};

export const retrieveRefreshTokenRecord = async (refreshToken) => {
  const dbResponse = await pool.query(QUERIES.RETRIEVE_REFRESH_TOKEN, [
    refreshToken,
  ]);
  const { email } = dbResponse.rows[0];
  return email;
};

export const deleteRefreshToken = async (email) => {
  await pool.query(QUERIES.DELETE_REFRESH_TOKEN, [email]);
};
