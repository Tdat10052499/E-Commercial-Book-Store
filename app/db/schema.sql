-- Release 1.0 – F1 accounts & roles. Idempotent: safe to run on every deploy.
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(254) NOT NULL UNIQUE,           -- stored trimmed + lower-case
  password_hash VARCHAR(100) NOT NULL,                  -- bcrypt, never plain text (US-01)
  role          VARCHAR(20)  NOT NULL DEFAULT 'customer'
                CHECK (role IN ('admin', 'customer')),  -- CR-06 would add 'staff' after CCB approval
  status        VARCHAR(10)  NOT NULL DEFAULT 'active'
                CHECK (status IN ('active', 'locked')),
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  token      CHAR(64) PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
