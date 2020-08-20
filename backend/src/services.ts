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
  console.log({ id, email, password });
  const match = compareSync(rawPassword, password);
  console.log({ match });
  if (match) {
    return { id, email };
  } else {
    throw `Invalid login credentials.`;
  }
};
