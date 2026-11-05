// Integration tests for F2/F3 catalogue code against a real PostgreSQL database (TEST_DATABASE_URL).
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://bookstore:bookstore@localhost:5432/bookstore_test';
const test = require('node:test');
const assert = require('node:assert');
const { pool } = require('../lib/db');
const { migrate } = require('../db/migrate');
const { seed } = require('../db/seed');
const catalog = require('../lib/catalog');

const reset = () => pool.query('TRUNCATE books, authors, categories RESTART IDENTITY CASCADE');

async function addBook(title, { authorId, categoryId, hidden = false, createdAt } = {}) {
  const { rows } = await pool.query(
    `INSERT INTO books (title, author_id, category_id, price, stock, is_deleted, created_at)
     VALUES ($1, $2, $3, 100000, 1, $4, coalesce($5::timestamptz, now())) RETURNING id`,
    [title, authorId ?? null, categoryId ?? null, hidden, createdAt ?? null]
  );
  return rows[0].id;
}

test.before(async () => { delete process.env.ADMIN_EMAIL; await migrate(); await reset(); });
test.after(() => pool.end());

// ---------- US-08 categories ----------
test('US-08/AC-01 add a category with a unique name; it is offered in the book form', async () => {
  const { category, errors } = await catalog.createCategory({ name: '  Novel ' });
  assert.strictEqual(errors, undefined);
  assert.strictEqual(category.name, 'Novel');
  const { categories } = await catalog.listCatalogOptions();
  assert.deepStrictEqual(categories.map((c) => c.name), ['Novel']);
});

test('US-08/AC-03 duplicate name (any case) refused', async () => {
  const { errors } = await catalog.createCategory({ name: 'NOVEL' });
  assert.strictEqual(errors.name, 'Category already exists');
});

test('US-08/AC-05 boundary 1 / 50 accepted, 0 / 51 rejected on the server', async () => {
  assert.ok((await catalog.createCategory({ name: 'A' })).category);
  assert.ok((await catalog.createCategory({ name: 'b'.repeat(50) })).category);
  assert.ok((await catalog.createCategory({ name: '' })).errors.name);
  assert.ok((await catalog.createCategory({ name: 'c'.repeat(51) })).errors.name);
});

test('US-08/AC-02 rename: books show the new name', async () => {
  const { category } = await catalog.createCategory({ name: 'Sci' });
  await addBook('Cosmos', { categoryId: category.id });
  const { errors } = await catalog.renameCategory(category.id, { name: 'Science' });
  assert.strictEqual(errors, undefined);
  const { books } = await catalog.listBooksPage(1);
  assert.strictEqual(books.find((b) => b.title === 'Cosmos').category_name, 'Science');
});

test('US-08/AC-03 rename to an existing name (any case) refused; unknown id → not found', async () => {
  const { rows } = await pool.query("SELECT id FROM categories WHERE name = 'Science'");
  assert.strictEqual((await catalog.renameCategory(rows[0].id, { name: 'novel' })).errors.name, 'Category already exists');
  assert.strictEqual((await catalog.renameCategory(99999, { name: 'X' })).errors.form, 'Category not found');
  assert.strictEqual((await catalog.renameCategory('abc', { name: 'X' })).errors.form, 'Category not found');
});

test('US-08/AC-04 remove refused while visible books use it: "Category is in use by N books"', async () => {
  const { category } = await catalog.createCategory({ name: 'Poetry' });
  await addBook('Poems 1', { categoryId: category.id });
  await addBook('Poems 2', { categoryId: category.id });
  assert.strictEqual((await catalog.removeCategory(category.id)).error, 'Category is in use by 2 books');
  const { rowCount } = await pool.query('SELECT 1 FROM categories WHERE id = $1', [category.id]);
  assert.strictEqual(rowCount, 1);
});

test('US-08/AC-04 a category used only by hidden books can be removed; hidden books keep their record', async () => {
  const { category } = await catalog.createCategory({ name: 'Old stock' });
  const bookId = await addBook('Hidden one', { categoryId: category.id, hidden: true });
  assert.deepStrictEqual(await catalog.removeCategory(category.id), { ok: true });
  const { rows } = await pool.query('SELECT category_id, is_deleted FROM books WHERE id = $1', [bookId]);
  assert.deepStrictEqual(rows[0], { category_id: null, is_deleted: true });
});

test('US-08 list shows the number of visible books per category', async () => {
  const list = await catalog.listCategories();
  assert.strictEqual(list.find((c) => c.name === 'Poetry').book_count, 2);
});

// ---------- US-09 authors ----------
test('US-09/AC-01 add an author with optional bio; selectable in the book form', async () => {
  const { author, errors } = await catalog.createAuthor({ name: 'Nam Cao', bio: '' });
  assert.strictEqual(errors, undefined);
  assert.strictEqual(author.bio, null);
  const { authors } = await catalog.listCatalogOptions();
  assert.ok(authors.some((a) => a.name === 'Nam Cao'));
});

test('US-09/AC-02 edit name: book list shows the new name', async () => {
  const { author } = await catalog.createAuthor({ name: 'To Hoai' });
  await addBook('De Men', { authorId: author.id });
  assert.strictEqual((await catalog.updateAuthor(author.id, { name: 'Tô Hoài', bio: 'Writer' })).errors, undefined);
  const { books } = await catalog.listBooksPage(1);
  assert.strictEqual(books.find((b) => b.title === 'De Men').author_name, 'Tô Hoài');
});

test('US-09/AC-03 remove refused while a visible book uses the author', async () => {
  const { rows } = await pool.query("SELECT id FROM authors WHERE name = 'Tô Hoài'");
  assert.strictEqual((await catalog.removeAuthor(rows[0].id)).error, 'Author is in use by 1 book');
  const { author } = await catalog.createAuthor({ name: 'Unused Author' });
  assert.deepStrictEqual(await catalog.removeAuthor(author.id), { ok: true });
  assert.strictEqual((await catalog.removeAuthor(author.id)).error, 'Author not found');
});

test('US-09/AC-04 name 100 accepted, 101 rejected on the server', async () => {
  assert.ok((await catalog.createAuthor({ name: 'a'.repeat(100) })).author);
  assert.ok((await catalog.createAuthor({ name: 'a'.repeat(101) })).errors.name);
});

// ---------- US-10 grid ----------
test('US-10/AC-04 no visible books → empty page, page 1', async () => {
  await reset();
  await addBook('Only hidden', { hidden: true });
  const r = await catalog.listBooksPage('1');
  assert.deepStrictEqual([r.books.length, r.page, r.lastPage, r.total], [0, 1, 1, 0]);
});

test('US-10/AC-02 exactly 12 visible books → one page', async () => {
  await reset();
  for (let i = 1; i <= 12; i += 1) await addBook(`Book ${i}`);
  const r = await catalog.listBooksPage('1');
  assert.deepStrictEqual([r.books.length, r.lastPage], [12, 1]);
});

test('US-10/AC-01, AC-02 25 books: 12 per page, newest first, page 3 shows 1 book; hidden books excluded', async () => {
  await reset();
  for (let i = 1; i <= 25; i += 1) await addBook(`Book ${i}`, { createdAt: `2026-10-${String(i).padStart(2, '0')}T10:00:00+07:00` });
  await addBook('Hidden newest', { hidden: true, createdAt: '2026-10-31T10:00:00+07:00' });
  const p1 = await catalog.listBooksPage('1');
  assert.strictEqual(p1.books.length, 12);
  assert.strictEqual(p1.books[0].title, 'Book 25');
  assert.strictEqual(p1.books[11].title, 'Book 14');
  const p3 = await catalog.listBooksPage('3');
  assert.deepStrictEqual(p3.books.map((b) => b.title), ['Book 1']);
  assert.strictEqual(p3.lastPage, 3);
});

test('US-10/AC-03 invalid page numbers do not fail', async () => {
  for (const raw of ['0', '-2', 'abc', ['2', '3']]) {
    const r = await catalog.listBooksPage(raw);
    assert.ok(r.page >= 1 && r.page <= 3, `raw=${raw}`);
  }
  assert.strictEqual((await catalog.listBooksPage('0')).page, 1);
  assert.strictEqual((await catalog.listBooksPage('999')).page, 3);
});

// ---------- NFR-02 seed ----------
test('NFR-02/AC-01 seed loads ≥ 30 visible books in ≥ 4 categories with covers, prices and stock', async () => {
  await reset();
  const first = await seed();
  assert.strictEqual(first.added, 30);
  const { rows } = await pool.query(`SELECT count(*)::int AS books, count(DISTINCT category_id)::int AS cats,
      count(*) FILTER (WHERE cover_url IS NULL OR price <= 0 OR stock < 0)::int AS bad FROM books WHERE NOT is_deleted`);
  assert.ok(rows[0].books >= 30);
  assert.ok(rows[0].cats >= 4);
  assert.strictEqual(rows[0].bad, 0);
});

test('NFR-02/AC-02 running the seed twice creates no duplicates', async () => {
  const second = await seed();
  assert.strictEqual(second.added, 0);
  const { rows } = await pool.query('SELECT count(*)::int AS n FROM books');
  assert.strictEqual(rows[0].n, 30);
  const { rows: cats } = await pool.query('SELECT count(*)::int AS n FROM categories');
  assert.strictEqual(cats[0].n, 6);
});

test('US-10/AC-01 seeded catalogue: page 1 newest first, last page has 6 books', async () => {
  const p1 = await catalog.listBooksPage();
  assert.strictEqual(p1.books[0].title, 'A Tale of Two Cities');
  assert.strictEqual(p1.lastPage, 3);
  assert.strictEqual((await catalog.listBooksPage(3)).books.length, 6);
});
