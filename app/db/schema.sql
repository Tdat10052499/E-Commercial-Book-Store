-- Release 1.0 – F1 accounts & roles. Idempotent: safe to run on every deploy.
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(254) NOT NULL UNIQUE,           -- stored trimmed + lower-case
  password_hash VARCHAR(100) NOT NULL,                  -- bcrypt, never plain text (NFR-01)
  role          VARCHAR(20)  NOT NULL DEFAULT 'customer'
                CHECK (role IN ('admin', 'staff', 'customer')),  -- 'staff' added by CR-06 (US-24)
  status        VARCHAR(10)  NOT NULL DEFAULT 'active'
                CHECK (status IN ('active', 'locked')),
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- CR-06 / US-24: databases created before Sprint 2 still have the old two-role CHECK; replace it (idempotent).
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'staff', 'customer'));

CREATE TABLE IF NOT EXISTS sessions (
  token      CHAR(64) PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);

-- Release 1.0 – F2 catalogue (Sprint 2: US-05…US-09, NFR-02). Idempotent like the F1 part.
CREATE TABLE IF NOT EXISTS categories (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(50) NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 50),  -- US-08/AC-05
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS categories_name_ci_key ON categories (lower(name));  -- US-08/AC-03

CREATE TABLE IF NOT EXISTS authors (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 100), -- US-09/AC-04
  bio        VARCHAR(1000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS authors_name_ci_key ON authors (lower(name));

-- Category/author may only be removed when no *visible* book uses them (US-08/AC-04, US-09/AC-03);
-- hidden books then lose the link (SET NULL) but keep their record (US-07/AC-01).
CREATE TABLE IF NOT EXISTS books (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  author_id   INTEGER REFERENCES authors(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  price       NUMERIC(12, 2) NOT NULL CHECK (price > 0),                 -- US-05/AC-02
  description TEXT,
  stock       INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  cover_url   VARCHAR(500),            -- static cover (seed data, NFR-02)
  cover_data  BYTEA,                   -- uploaded JPG/PNG ≤ 2 MB (US-05/AC-04)
  cover_mime  VARCHAR(20) CHECK (cover_mime IN ('image/jpeg', 'image/png')),
  is_deleted  BOOLEAN NOT NULL DEFAULT false,                            -- soft delete (US-07)
  seed_key    VARCHAR(40) UNIQUE,      -- set only by db/seed.js so a re-run adds no duplicates (NFR-02/AC-02)
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS books_visible_newest_idx ON books (created_at DESC, id DESC) WHERE NOT is_deleted;  -- US-10
CREATE INDEX IF NOT EXISTS books_author_id_idx ON books (author_id);
CREATE INDEX IF NOT EXISTS books_category_id_idx ON books (category_id);
