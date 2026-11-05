// F2/F3 catalogue data access: categories (US-08), authors (US-09) and the public book grid (US-10).
// Every write re-validates on the server, whatever the client did (NFR-01/AC-02).
const { pool } = require('./db');
const { PAGE_SIZE, validateCategory, validateAuthor, inUseMessage, resolvePage } = require('./catalog-validation');

const UNIQUE_VIOLATION = '23505';
const toId = (id) => (/^\d+$/.test(String(id ?? '')) ? Number(id) : null);
const clean = (v) => String(v ?? '').trim();

// ---------- Categories (US-08) ----------

async function listCategories() {
  const { rows } = await pool.query(
    `SELECT c.id, c.name, c.created_at,
            count(b.id) FILTER (WHERE NOT b.is_deleted)::int AS book_count
       FROM categories c LEFT JOIN books b ON b.category_id = c.id
      GROUP BY c.id ORDER BY lower(c.name)`
  );
  return rows;
}

async function createCategory(input) {
  const errors = validateCategory(input);
  if (Object.keys(errors).length) return { errors };
  try {
    const { rows } = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING id, name', [clean(input.name)]);
    return { category: rows[0] };
  } catch (err) {
    if (err.code === UNIQUE_VIOLATION) return { errors: { name: 'Category already exists' } }; // US-08/AC-03
    throw err;
  }
}

// US-08/AC-02: books reference the category by id, so every book shows the new name at once.
async function renameCategory(id, input) {
  const categoryId = toId(id);
  if (!categoryId) return { errors: { form: 'Category not found' } };
  const errors = validateCategory(input);
  if (Object.keys(errors).length) return { errors };
  try {
    const { rows } = await pool.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING id, name', [clean(input.name), categoryId]);
    if (!rows.length) return { errors: { form: 'Category not found' } };
    return { category: rows[0] };
  } catch (err) {
    if (err.code === UNIQUE_VIOLATION) return { errors: { name: 'Category already exists' } };
    throw err;
  }
}

// Shared by categories and authors: refuse while visible books use the row (US-08/AC-04, US-09/AC-03).
async function removeReferenced(table, column, label, id) {
  const rowId = toId(id);
  if (!rowId) return { error: `${label} not found` };
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const found = await client.query(`SELECT id FROM ${table} WHERE id = $1 FOR UPDATE`, [rowId]);
    if (!found.rowCount) { await client.query('ROLLBACK'); return { error: `${label} not found` }; }
    const { rows } = await client.query(`SELECT count(*)::int AS n FROM books WHERE ${column} = $1 AND NOT is_deleted`, [rowId]);
    if (rows[0].n > 0) { await client.query('ROLLBACK'); return { error: inUseMessage(label, rows[0].n) }; }
    await client.query(`DELETE FROM ${table} WHERE id = $1`, [rowId]); // hidden books keep their record, link becomes NULL
    await client.query('COMMIT');
    return { ok: true };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

const removeCategory = (id) => removeReferenced('categories', 'category_id', 'Category', id);

// ---------- Authors (US-09) ----------

async function listAuthors() {
  const { rows } = await pool.query(
    `SELECT a.id, a.name, a.bio, a.created_at,
            count(b.id) FILTER (WHERE NOT b.is_deleted)::int AS book_count
       FROM authors a LEFT JOIN books b ON b.author_id = a.id
      GROUP BY a.id ORDER BY lower(a.name)`
  );
  return rows;
}

const authorValues = (input) => [clean(input.name), clean(input.bio) || null];

async function createAuthor(input) {
  const errors = validateAuthor(input);
  if (Object.keys(errors).length) return { errors };
  try {
    const { rows } = await pool.query('INSERT INTO authors (name, bio) VALUES ($1, $2) RETURNING id, name, bio', authorValues(input));
    return { author: rows[0] };
  } catch (err) {
    if (err.code === UNIQUE_VIOLATION) return { errors: { name: 'Author already exists' } };
    throw err;
  }
}

// US-09/AC-02: books reference the author by id, so the list shows the new name at once.
async function updateAuthor(id, input) {
  const authorId = toId(id);
  if (!authorId) return { errors: { form: 'Author not found' } };
  const errors = validateAuthor(input);
  if (Object.keys(errors).length) return { errors };
  try {
    const { rows } = await pool.query('UPDATE authors SET name = $1, bio = $2 WHERE id = $3 RETURNING id, name, bio', [...authorValues(input), authorId]);
    if (!rows.length) return { errors: { form: 'Author not found' } };
    return { author: rows[0] };
  } catch (err) {
    if (err.code === UNIQUE_VIOLATION) return { errors: { name: 'Author already exists' } };
    throw err;
  }
}

const removeAuthor = (id) => removeReferenced('authors', 'author_id', 'Author', id);

// Options for the book form (US-08/AC-01, US-09/AC-01 – used by US-05/US-06).
async function listCatalogOptions() {
  const [categories, authors] = await Promise.all([
    pool.query('SELECT id, name FROM categories ORDER BY lower(name)'),
    pool.query('SELECT id, name FROM authors ORDER BY lower(name)'),
  ]);
  return { categories: categories.rows, authors: authors.rows };
}

// ---------- Public book grid (US-10) ----------

// Card fields only; the cover bytes are served separately by /book-covers/[id].
const CARD_COLUMNS = `b.id, b.title, b.price, b.created_at, b.cover_url, (b.cover_data IS NOT NULL) AS has_upload,
                      a.name AS author_name, c.name AS category_name`;

async function countVisibleBooks() {
  const { rows } = await pool.query('SELECT count(*)::int AS n FROM books WHERE NOT is_deleted');
  return rows[0].n;
}

// Visible books only (US-07/AC-01), newest first, 12 per page (US-10/AC-01…AC-03).
async function listBooksPage(rawPage, pageSize = PAGE_SIZE) {
  const total = await countVisibleBooks();
  const { page, lastPage, offset } = resolvePage(rawPage, total, pageSize);
  const { rows } = await pool.query(
    `SELECT ${CARD_COLUMNS}
       FROM books b LEFT JOIN authors a ON a.id = b.author_id LEFT JOIN categories c ON c.id = b.category_id
      WHERE NOT b.is_deleted
      ORDER BY b.created_at DESC, b.id DESC
      LIMIT $1 OFFSET $2`,
    [pageSize, offset]
  );
  return { books: rows, page, lastPage, total, pageSize };
}

async function getCover(id) {
  const bookId = toId(id);
  if (!bookId) return null;
  const { rows } = await pool.query('SELECT cover_data, cover_mime FROM books WHERE id = $1 AND NOT is_deleted AND cover_data IS NOT NULL', [bookId]);
  return rows[0] || null;
}

module.exports = {
  listCategories, createCategory, renameCategory, removeCategory,
  listAuthors, createAuthor, updateAuthor, removeAuthor,
  listCatalogOptions, countVisibleBooks, listBooksPage, getCover,
};
