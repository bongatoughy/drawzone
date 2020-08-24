export const SCHEMA = {
  USERS: `
    CREATE TABLE IF NOT EXISTS 
    users (
      id              BIGSERIAL PRIMARY KEY,
      email           VARCHAR(255) UNIQUE NOT NULL,
      password        VARCHAR(255) NOT NULL
    );
  `,
  REFRESH_TOKENS: `
    CREATE TABLE IF NOT EXISTS
    refresh_tokens (
      token           VARCHAR(255) NOT NULL,
      email           VARCHAR(255) UNIQUE NOT NULL
    )
  `,
  DRAWINGS: `
    CREATE TABLE IF NOT EXISTS
    drawings (
      id              BIGSERIAL PRIMARY KEY,
      user_id         BIGSERIAL REFERENCES users(id),
      created_at      TIMESTAMP NOT NULL,
      completed_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      is_public       BOOLEAN DEFAULT FALSE
    )
  `,
  STROKES: `
    CREATE TABLE IF NOT EXISTS
    strokes (
      id              BIGSERIAL PRIMARY KEY,
      color           VARCHAR(255) NOT NULL,
      width           INTEGER DEFAULT 1,
      brush           VARCHAR(255) NOT NULL,
      drawing_id      BIGSERIAL REFERENCES drawings(id)
    )
  `,
  POINTS: `
    CREATE TABLE IF NOT EXISTS
    points (
      id              BIGSERIAL PRIMARY KEY,
      x               INTEGER NOT NULL,
      y               INTEGER NOT NULL,
      stroke_id       BIGSERIAL REFERENCES strokes(id)
    )
  `,
};
