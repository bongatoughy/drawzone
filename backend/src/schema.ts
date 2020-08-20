export const SCHEMA = {
  USERS: `
    CREATE TABLE IF NOT EXISTS 
    users (
      id              BIGSERIAL PRIMARY KEY,
      email           VARCHAR(255) UNIQUE NOT NULL,
      password        VARCHAR(255) NOT NULL
    );
  `,
};
