import { Pool } from "pg";
import { SCHEMA } from "./schema";
import { config } from "dotenv";

config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const migrate = async () => {
  const client = await pool.connect();
  const queries = Object.values(SCHEMA);

  for (var i = 0; i < queries.length; i++) {
    await client.query(queries[i]);
  }
  client.release();
  await pool.end();
};

migrate();
