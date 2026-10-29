// Applies db/schema.sql and creates the first administrator from env vars.
// Usage: DATABASE_URL=... ADMIN_EMAIL=... ADMIN_PASSWORD=... node db/migrate.js
const fs = require('node:fs');
const path = require('node:path');
const { pool } = require('../lib/db');
const { hashPassword } = require('../lib/password');

async function migrate() {
  await pool.query(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, 'admin') ON CONFLICT (email) DO NOTHING`,
      [process.env.ADMIN_NAME || 'Administrator', email, await hashPassword(password)]
    );
  }
}

if (require.main === module) {
  migrate()
    .then(() => { console.log('Migration done'); return pool.end(); })
    .catch((err) => { console.error(err); process.exit(1); });
}

module.exports = { migrate };
