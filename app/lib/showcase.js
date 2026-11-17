// Home page showcase (UI polish, outside the Release 1.0 backlog): read-only queries that pick books for
// the themed rails on the home page. Visible books only, same card columns as the catalogue grid (US-10).
const { pool } = require('./db');

const CARD_COLUMNS = `b.id, b.title, b.price, b.created_at, b.cover_url, (b.cover_data IS NOT NULL) AS has_upload,
                      a.name AS author_name, c.name AS category_name`;
const BOOK_JOINS = 'FROM books b LEFT JOIN authors a ON a.id = b.author_id LEFT JOIN categories c ON c.id = b.category_id';

// Newest visible books of one category (case-insensitive name). Unknown category → [].
async function listBooksInCategory(categoryName, limit = 10) {
  const { rows } = await pool.query(
    `SELECT ${CARD_COLUMNS} ${BOOK_JOINS}
      WHERE NOT b.is_deleted AND lower(c.name) = lower($1)
      ORDER BY b.created_at DESC, b.id DESC LIMIT $2`,
    [categoryName, limit]
  );
  return rows;
}

// Hand-picked books by seed key, in the order given; keys that are missing or hidden are skipped.
async function listBooksBySeedKeys(keys) {
  if (!keys.length) return [];
  const { rows } = await pool.query(
    `SELECT ${CARD_COLUMNS}, b.seed_key ${BOOK_JOINS} WHERE NOT b.is_deleted AND b.seed_key = ANY($1)`,
    [keys]
  );
  const byKey = new Map(rows.map((r) => [r.seed_key, r]));
  return keys.map((k) => byKey.get(k)).filter(Boolean);
}

// Categories that have at least `min` visible books, largest first – used for the "Shop by category" tiles.
async function listCategoryCounts(min = 1) {
  const { rows } = await pool.query(
    `SELECT c.name, count(b.id)::int AS n FROM categories c JOIN books b ON b.category_id = c.id AND NOT b.is_deleted
      GROUP BY c.id HAVING count(b.id) >= $1 ORDER BY n DESC, lower(c.name)`,
    [min]
  );
  return rows;
}

module.exports = { listBooksInCategory, listBooksBySeedKeys, listCategoryCounts };
