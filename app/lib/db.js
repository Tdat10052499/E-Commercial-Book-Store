const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const isLocal = !connectionString || /localhost|127\.0\.0\.1/.test(connectionString);

// Reuse one pool across hot reloads and serverless invocations.
const pool = globalThis.__pgPool || new Pool({
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false },
  max: 5,
});
globalThis.__pgPool = pool;

module.exports = { pool };
