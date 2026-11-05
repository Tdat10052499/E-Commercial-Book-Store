// NFR-02: loads ≥ 30 sample books (6 categories, covers, prices, stock). Safe to run on every deploy:
// a book whose seed_key already exists is skipped, so a second run adds nothing (NFR-02/AC-02),
// and a seed book an administrator has hidden or edited is left as it is.
// Usage: DATABASE_URL=... node db/seed.js
const { pool } = require('../lib/db');
const { AUTHORS, BOOKS, createdAt } = require('./seed-data');

async function ensureId(client, table, name, bio) {
  if (table === 'authors') {
    await client.query('INSERT INTO authors (name, bio) VALUES ($1, $2) ON CONFLICT ((lower(name))) DO NOTHING', [name, bio]);
  } else {
    await client.query('INSERT INTO categories (name) VALUES ($1) ON CONFLICT ((lower(name))) DO NOTHING', [name]);
  }
  const { rows } = await client.query(`SELECT id FROM ${table} WHERE lower(name) = lower($1)`, [name]);
  return rows[0].id;
}

async function seed() {
  const client = await pool.connect();
  let added = 0;
  try {
    await client.query('BEGIN');
    const { rows } = await client.query('SELECT seed_key FROM books WHERE seed_key IS NOT NULL');
    const existing = new Set(rows.map((r) => r.seed_key));
    for (const [i, [key, title, authorKey, category, price, stock, description]] of BOOKS.entries()) {
      if (existing.has(key)) continue;
      const author = AUTHORS[authorKey];
      const authorId = await ensureId(client, 'authors', author.name, author.bio);
      const categoryId = await ensureId(client, 'categories', category);
      await client.query(
        `INSERT INTO books (title, author_id, category_id, price, stock, description, cover_url, seed_key, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9) ON CONFLICT (seed_key) DO NOTHING`,
        [title, authorId, categoryId, price, stock, description, `/covers/${key}.svg`, key, createdAt(i)]
      );
      added += 1;
    }
    await client.query('COMMIT');
    return { added, total: BOOKS.length };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

if (require.main === module) {
  seed()
    .then(({ added, total }) => { console.log(`Seed done: ${added} of ${total} sample books added`); return pool.end(); })
    .catch((err) => { console.error(err); process.exit(1); });
}

module.exports = { seed };
