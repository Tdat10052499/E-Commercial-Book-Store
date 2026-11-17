// Optional extra demo catalogue (54 books with Open Library covers) – UI polish, outside NFR-02.
// Run it by hand, or on Vercel by setting SEED_DEMO_BOOKS=1 (see package.json "vercel-build").
// Idempotent like db/seed.js: a book whose seed_key already exists is skipped, so edits and hides made in the
// back office are kept. Remove the books again with: node db/seed-demo.js --remove (hard delete of demo-* rows only).
// Usage: DATABASE_URL=... node db/seed-demo.js [--remove]
const { pool } = require('../lib/db');
const { AUTHORS, BOOKS, coverUrl, createdAt, describe } = require('./demo-books');

async function ensureId(client, table, name, bio) {
  if (table === 'authors') {
    await client.query('INSERT INTO authors (name, bio) VALUES ($1, $2) ON CONFLICT ((lower(name))) DO NOTHING', [name, bio]);
  } else {
    await client.query('INSERT INTO categories (name) VALUES ($1) ON CONFLICT ((lower(name))) DO NOTHING', [name]);
  }
  const { rows } = await client.query(`SELECT id FROM ${table} WHERE lower(name) = lower($1)`, [name]);
  return rows[0].id;
}

async function seedDemo() {
  const client = await pool.connect();
  let added = 0;
  try {
    await client.query('BEGIN');
    const { rows } = await client.query("SELECT seed_key FROM books WHERE seed_key LIKE 'demo-%'");
    const existing = new Set(rows.map((r) => r.seed_key));
    for (const [i, book] of BOOKS.entries()) {
      const [key, title, authorKey, category, price, stock, , , coverId] = book;
      if (existing.has(key)) continue;
      const author = AUTHORS[authorKey];
      const authorId = await ensureId(client, 'authors', author.name, author.bio);
      const categoryId = await ensureId(client, 'categories', category);
      await client.query(
        `INSERT INTO books (title, author_id, category_id, price, stock, description, cover_url, seed_key, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9) ON CONFLICT (seed_key) DO NOTHING`,
        [title, authorId, categoryId, price, stock, describe(book), coverUrl(coverId), key, createdAt(i)]
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

// Removes only the demo books (seed_key demo-*). Authors and categories stay, so nothing else can break.
async function removeDemo() {
  const { rowCount } = await pool.query("DELETE FROM books WHERE seed_key LIKE 'demo-%'");
  return rowCount;
}

if (require.main === module) {
  const run = process.argv.includes('--remove')
    ? removeDemo().then((n) => console.log(`Removed ${n} demo books`))
    : seedDemo().then(({ added, total }) => console.log(`Demo seed done: ${added} of ${total} demo books added`));
  run.then(() => pool.end()).catch((err) => { console.error(err); process.exit(1); });
}

module.exports = { seedDemo, removeDemo };
