// S3-T09: search in listBooksPage (US-12/AC-01, AC-03) against the 30 seed books, plus the shared validateFilters rule.
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://bookstore:bookstore@localhost:5432/bookstore_test';
const test = require('node:test');
const assert = require('node:assert');
const { pool } = require('../lib/db');
const { migrate } = require('../db/migrate');
const { seed } = require('../db/seed');
const catalog = require('../lib/catalog');
const { validateFilters, SEARCH_MAX } = require('../lib/catalog-validation');

const titles = (r) => r.books.map((b) => b.title);

test.before(async () => {
  delete process.env.ADMIN_EMAIL;
  await migrate();
  await pool.query('TRUNCATE books, authors, categories RESTART IDENTITY CASCADE');
  await seed();
});
test.after(() => pool.end());

// ---------- UNIT: validateFilters (US-12/AC-03) ----------
test('US-12/AC-03 validateFilters trims the keyword and cuts it to 100 characters', () => {
  assert.strictEqual(validateFilters({ q: '  austen  ' }).filters.q, 'austen');
  assert.strictEqual(validateFilters({ q: '   ' }).filters.q, '');
  assert.strictEqual(validateFilters({}).filters.q, '');
  assert.strictEqual(validateFilters({ q: ['first', 'second'] }).filters.q, 'first');
  assert.strictEqual(validateFilters({ q: 'x'.repeat(101) }).filters.q.length, SEARCH_MAX);
  assert.strictEqual(validateFilters({ q: 'x' }).error, null);
});

// ---------- INT: TC-F5-01 (US-12/AC-01) ----------
test('TC-F5-01 US-12/AC-01 author match in any case: AUSTEN → Emma, Pride and Prejudice (newest first)', async () => {
  const r = await catalog.listBooksPage(1, { q: 'AUSTEN' });
  assert.deepStrictEqual(titles(r), ['Emma', 'Pride and Prejudice']);
  assert.strictEqual(r.total, 2);
  assert.strictEqual(r.filters.q, 'AUSTEN');
});

test('TC-F5-01 US-12/AC-01 darwin → the 2 Darwin books; partial title "expect" → Great Expectations', async () => {
  assert.deepStrictEqual(titles(await catalog.listBooksPage(1, { q: 'darwin' })), ['The Voyage of the Beagle', 'On the Origin of Species']);
  assert.deepStrictEqual(titles(await catalog.listBooksPage(1, { q: 'expect' })), ['Great Expectations']);
});

test('US-12/AC-01 a keyword in the title or the author name, results stay 12 per page with paging', async () => {
  const r = await catalog.listBooksPage(1, { q: 'e' });
  assert.ok(r.total > 12, `expected more than 12 matches, got ${r.total}`);
  assert.strictEqual(r.books.length, 12);
  assert.strictEqual(r.lastPage, Math.ceil(r.total / 12));
  const last = await catalog.listBooksPage(r.lastPage, { q: 'e' });
  assert.strictEqual(last.books.length, r.total - 12 * (r.lastPage - 1));
  const all = [...titles(r), ...titles(last)];
  assert.strictEqual(new Set(all).size, all.length, 'no book appears on two pages');
});

test('US-12 hidden books are never found', async () => {
  const { rows } = await pool.query("UPDATE books SET is_deleted = true WHERE title = 'Emma' RETURNING id");
  try {
    assert.deepStrictEqual(titles(await catalog.listBooksPage(1, { q: 'austen' })), ['Pride and Prejudice']);
  } finally {
    await pool.query('UPDATE books SET is_deleted = false WHERE id = $1', [rows[0].id]);
  }
});

// ---------- INT: TC-F5-02 (US-12/AC-02, data part) ----------
test('TC-F5-02 US-12/AC-02 no match → empty list, total 0, page 1 of 1', async () => {
  const r = await catalog.listBooksPage(1, { q: 'zzqx' });
  assert.deepStrictEqual(r.books, []);
  assert.strictEqual(r.total, 0);
  assert.strictEqual(r.page, 1);
  assert.strictEqual(r.lastPage, 1);
});

// ---------- INT: TC-F5-03 (US-12/AC-03) ----------
test('TC-F5-03 (a)(b) empty keyword or only spaces → all 30 books, page 1 of 3', async () => {
  for (const q of ['', '   ', undefined]) {
    const r = await catalog.listBooksPage(1, { q });
    assert.strictEqual(r.total, 30);
    assert.strictEqual(r.lastPage, 3);
    assert.strictEqual(r.filters.q, '');
  }
});

test('TC-F5-03 (c)(d) 100-character keyword searches; 101 characters is cut to 100, no error', async () => {
  const r100 = await catalog.listBooksPage(1, { q: 'a'.repeat(100) });
  assert.strictEqual(r100.total, 0);
  assert.strictEqual(r100.error, null);
  const r101 = await catalog.listBooksPage(1, { q: 'a'.repeat(101) });
  assert.strictEqual(r101.filters.q.length, 100);
  assert.strictEqual(r101.total, 0);
});

test('TC-F5-03 (e)(f)(g) % \' _ and \\ are plain text: no match, no SQL error, never "all books"', async () => {
  for (const q of ['%', "'", '_', '\\', "'; DROP TABLE books; --", '%%', '_e_']) {
    const r = await catalog.listBooksPage(1, { q });
    assert.strictEqual(r.total, 0, `keyword ${JSON.stringify(q)} should match nothing`);
  }
  const { rows } = await pool.query('SELECT count(*)::int AS n FROM books');
  assert.strictEqual(rows[0].n, 30);
});

test('US-12/AC-03 a literal % or _ in a title is found as text', async () => {
  const { rows } = await pool.query(
    "INSERT INTO books (title, price, stock) VALUES ('100% Cotton_Guide', 1000, 1) RETURNING id"
  );
  try {
    assert.deepStrictEqual(titles(await catalog.listBooksPage(1, { q: '100%' })), ['100% Cotton_Guide']);
    assert.deepStrictEqual(titles(await catalog.listBooksPage(1, { q: 'n_g' })), ['100% Cotton_Guide']);
  } finally {
    await pool.query('DELETE FROM books WHERE id = $1', [rows[0].id]);
  }
});

test('US-10 unchanged: no filters → same grid as before; page size argument still works', async () => {
  const r = await catalog.listBooksPage();
  assert.strictEqual(r.total, 30);
  assert.strictEqual(r.books[0].title, 'A Tale of Two Cities');
  assert.strictEqual((await catalog.listBooksPage(1, {}, 6)).books.length, 6);
});
