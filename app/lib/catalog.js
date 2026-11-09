// F2/F3 catalogue data access: categories (US-08), authors (US-09) and the public book grid (US-10).
// Every write re-validates on the server, whatever the client did (NFR-01/AC-02).
const { pool } = require('./db');
const {
  PAGE_SIZE, COVER, validateCategory, validateAuthor, validateBook, validateCover, inUseMessage, resolvePage, validateFilters,
} = require('./catalog-validation');

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

// ---------- Books (US-05 add, US-06 edit, US-07 hide) ----------

const FK_VIOLATION = '23503';

// Real JPG/PNG signature, so a renamed file is refused even if the browser sends image/png (US-05/AC-04).
function coverMimeFromBytes(buf) {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (buf.length >= 8 && png.every((b, i) => buf[i] === b)) return 'image/png';
  return null;
}

// cover: { data: Buffer, type: string } or null. Returns { cover } or { error }.
function checkCover(cover) {
  if (!cover || !cover.data || !cover.data.length) return { cover: null };
  const declared = validateCover({ size: cover.data.length, type: cover.type });
  if (declared) return { error: declared };
  const mime = coverMimeFromBytes(cover.data);
  if (!mime || !COVER.types.includes(mime)) return { error: 'Cover must be a JPG or PNG image' };
  return { cover: { data: cover.data, mime } };
}

function bookValues(input) {
  return {
    title: clean(input.title),
    author_id: Number(input.author_id),
    category_id: Number(input.category_id),
    price: clean(input.price).replace(',', '.'),
    description: clean(input.description) || null,
    stock: Number(clean(input.stock)),
  };
}

// Server-side checks shared by add and edit: fields, cover, and that the author/category exist.
async function prepareBook(input, rawCover) {
  const errors = validateBook(input);
  const checked = checkCover(rawCover);
  if (checked.error) errors.cover = checked.error;
  if (Object.keys(errors).length) return { errors };
  return { values: bookValues(input), cover: checked.cover };
}

const fkErrors = () => ({ errors: { form: 'The selected author or category no longer exists' } });

// US-05/AC-01: new book is saved and is first in the newest-first list. Cover required on add.
// US-25/AC-01: `actor` is the signed-in user; their name is stored with the book.
const actorName = (actor) => String(actor?.name || '').trim().slice(0, 100) || 'System';

async function createBook(input, rawCover, actor) {
  const prepared = await prepareBook(input, rawCover);
  if (prepared.errors) return prepared;
  if (!prepared.cover) return { errors: { cover: 'Cover image is required' } };
  const v = prepared.values;
  try {
    const { rows } = await pool.query(
      `INSERT INTO books (title, author_id, category_id, price, description, stock, cover_data, cover_mime, updated_by_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, title`,
      [v.title, v.author_id, v.category_id, v.price, v.description, v.stock, prepared.cover.data, prepared.cover.mime,
        actorName(actor)]
    );
    return { book: rows[0] };
  } catch (err) {
    if (err.code === FK_VIOLATION) return fkErrors();
    throw err;
  }
}

// Visible books only: hidden or unknown ids are "not found" (US-06/AC-03).
async function getBook(id) {
  const bookId = toId(id);
  if (!bookId) return null;
  const { rows } = await pool.query(
    `SELECT b.id, b.title, b.author_id, b.category_id, b.price, b.description, b.stock, b.cover_url,
            (b.cover_data IS NOT NULL) AS has_upload, b.created_at, b.updated_at, b.updated_by_name,
            a.name AS author_name, c.name AS category_name
       FROM books b LEFT JOIN authors a ON a.id = b.author_id LEFT JOIN categories c ON c.id = b.category_id
      WHERE b.id = $1 AND NOT b.is_deleted`,
    [bookId]
  );
  return rows[0] || null;
}

const sameBook = (old, v) => old.title === v.title && old.author_id === v.author_id && old.category_id === v.category_id
  && Number(old.price) === Number(v.price) && (old.description || null) === v.description && old.stock === v.stock;

// US-06: invalid data keeps the old values (AC-02); no change → book untouched + confirmation (AC-04).
async function updateBook(id, input, rawCover, actor) {
  const old = await getBook(id);
  if (!old) return { notFound: true, errors: { form: 'Book not found' } };
  const prepared = await prepareBook(input, rawCover);
  if (prepared.errors) return prepared;
  const v = prepared.values;
  if (!prepared.cover && sameBook(old, v)) return { book: old, unchanged: true };
  try {
    const { rows } = await pool.query(
      `UPDATE books SET title = $1, author_id = $2, category_id = $3, price = $4, description = $5, stock = $6,
              cover_data = coalesce($7, cover_data), cover_mime = coalesce($8, cover_mime),
              updated_at = now(), updated_by_name = $10
        WHERE id = $9 AND NOT is_deleted RETURNING id, title`,
      [v.title, v.author_id, v.category_id, v.price, v.description, v.stock,
        prepared.cover?.data ?? null, prepared.cover?.mime ?? null, old.id, actorName(actor)]
    );
    if (!rows.length) return { notFound: true, errors: { form: 'Book not found' } };
    return { book: rows[0] };
  } catch (err) {
    if (err.code === FK_VIOLATION) return fkErrors();
    throw err;
  }
}

// US-07/AC-01: soft delete – the record stays with is_deleted = true.
async function hideBook(id) {
  const bookId = toId(id);
  if (!bookId) return { error: 'Book not found' };
  const { rowCount } = await pool.query('UPDATE books SET is_deleted = true, updated_at = now() WHERE id = $1 AND NOT is_deleted', [bookId]);
  if (!rowCount) return { error: 'Book not found' };
  return { ok: true };
}

// Back-office list: visible books, newest first (hidden books are not editable – US-06/AC-03).
async function listAdminBooks() {
  const { rows } = await pool.query(
    `SELECT ${'b.id, b.title, b.price, b.stock, b.created_at, a.name AS author_name, c.name AS category_name'}
       FROM books b LEFT JOIN authors a ON a.id = b.author_id LEFT JOIN categories c ON c.id = b.category_id
      WHERE NOT b.is_deleted ORDER BY b.created_at DESC, b.id DESC`
  );
  return rows;
}

// ---------- Public book grid (US-10) ----------

// Card fields only; the cover bytes are served separately by /book-covers/[id].
const CARD_COLUMNS = `b.id, b.title, b.price, b.created_at, b.cover_url, (b.cover_data IS NOT NULL) AS has_upload,
                      a.name AS author_name, c.name AS category_name`;

async function countVisibleBooks() {
  const { rows } = await pool.query('SELECT count(*)::int AS n FROM books WHERE NOT is_deleted');
  return rows[0].n;
}

// US-12/AC-01, AC-03: the keyword matches the title OR the author name, in any case, anywhere in the text.
// Backslash, % and _ are escaped, so they are matched as plain characters and never act as wildcards.
const likePattern = (text) => `%${text.replace(/[\\%_]/g, (ch) => `\\${ch}`)}%`;

function visibleBooksWhere(filters) {
  const where = ['NOT b.is_deleted'];
  const params = [];
  if (filters.q) {
    params.push(likePattern(filters.q));
    const p = `$${params.length}`;
    where.push(`(b.title ILIKE ${p} ESCAPE '\\' OR a.name ILIKE ${p} ESCAPE '\\')`);
  }
  return { sql: where.join(' AND '), params };
}

const BOOK_JOINS = 'FROM books b LEFT JOIN authors a ON a.id = b.author_id LEFT JOIN categories c ON c.id = b.category_id';

// Visible books only (US-07/AC-01), newest first, 12 per page (US-10/AC-01…AC-03), narrowed by the search
// keyword (US-12). `rawFilters` is the raw query ({ q, category, min, max }); validateFilters cleans it.
// Returns the cleaned `filters` so the form can show them again, and `error` for a filter that was refused.
async function listBooksPage(rawPage, rawFilters = {}, pageSize = PAGE_SIZE) {
  const { filters, error } = validateFilters(rawFilters);
  const { sql, params } = visibleBooksWhere(filters);
  const { rows: [{ n: total }] } = await pool.query(`SELECT count(*)::int AS n ${BOOK_JOINS} WHERE ${sql}`, params);
  const { page, lastPage, offset } = resolvePage(rawPage, total, pageSize);
  const { rows } = await pool.query(
    `SELECT ${CARD_COLUMNS} ${BOOK_JOINS}
      WHERE ${sql}
      ORDER BY b.created_at DESC, b.id DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, pageSize, offset]
  );
  return { books: rows, page, lastPage, total, pageSize, filters, error };
}

async function getCover(id) {
  const bookId = toId(id);
  if (!bookId) return null;
  const { rows } = await pool.query('SELECT cover_data, cover_mime FROM books WHERE id = $1 AND NOT is_deleted AND cover_data IS NOT NULL', [bookId]);
  return rows[0] || null;
}

// US-25/AC-01: "Last updated by <name> at dd/mm/yyyy HH:mm", shown in the shop's time zone (GMT+7).
function formatLastUpdated(name, at) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(at)).map((x) => [x.type, x.value]));
  return `Last updated by ${name || 'System'} at ${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute}`;
}

module.exports = {
  formatLastUpdated,
  listCategories, createCategory, renameCategory, removeCategory,
  listAuthors, createAuthor, updateAuthor, removeAuthor,
  listCatalogOptions, countVisibleBooks, listBooksPage, getCover,
  createBook, getBook, updateBook, hideBook, listAdminBooks, coverMimeFromBytes,
};
