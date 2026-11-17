// S3-T11: category + price filter in listBooksPage (US-13/AC-01…AC-04) against the 30 seed books.
// Expected rows come from an independent SQL query, not from the code under test.
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://bookstore:bookstore@localhost:5432/bookstore_test';
const test = require('node:test');
const assert = require('node:assert');
const { pool } = require('../lib/db');
const { migrate } = require('../db/migrate');
const { seed } = require('../db/seed');
const catalog = require('../lib/catalog');
const { validateFilters, listQueryString, PRICE_RANGE_ERROR } = require('../lib/catalog-validation');

const ids = (r) => r.books.map((b) => b.id);
let novelId;

// Visible books matching category/price, newest first – written independently of visibleBooksWhere.
async function expected({ categoryId = null, min = null, max = null } = {}) {
  const { rows } = await pool.query(
    `SELECT id FROM books WHERE NOT is_deleted
       AND ($1::int IS NULL OR category_id = $1) AND ($2::numeric IS NULL OR price >= $2) AND ($3::numeric IS NULL OR price <= $3)
     ORDER BY created_at DESC, id DESC`,
    [categoryId, min, max]
  );
  return rows.map((r) => r.id);
}

test.before(async () => {
  delete process.env.ADMIN_EMAIL;
  await migrate();
  await pool.query('TRUNCATE books, authors, categories RESTART IDENTITY CASCADE');
  await seed();
  novelId = (await pool.query("SELECT id FROM categories WHERE name = 'Novel'")).rows[0].id;
});
test.after(() => pool.end());

// ---------- UNIT: validateFilters ----------
test('US-13 validateFilters keeps a category id and whole VND bounds; invalid values are ignored, not errors', () => {
  const { filters, applied, error } = validateFilters({ q: ' emma ', category: '3', min: ' 50000 ', max: '150000' });
  assert.deepStrictEqual(filters, { q: 'emma', category: '3', min: '50000', max: '150000' });
  assert.deepStrictEqual(applied, { q: 'emma', categoryId: 3, min: 50000, max: 150000 });
  assert.strictEqual(error, null);
  for (const bad of ['-5', 'abc', '1.5', '1e5', ' ', '9'.repeat(13)]) {
    const r = validateFilters({ category: bad, min: bad, max: bad });
    assert.deepStrictEqual([r.applied.categoryId, r.applied.min, r.applied.max, r.error], [null, null, null, null], bad);
  }
  assert.strictEqual(validateFilters({ category: '0' }).applied.categoryId, null);
  assert.strictEqual(validateFilters({ min: ['100', '200'] }).applied.min, 100); // first value wins, as for q
});

test('US-13/AC-03 validateFilters: min > max → message, price range not applied; min = max is allowed', () => {
  const r = validateFilters({ q: 'a', category: '2', min: '200000', max: '100000' });
  assert.strictEqual(r.error, PRICE_RANGE_ERROR);
  assert.strictEqual(PRICE_RANGE_ERROR, 'Minimum price must not exceed maximum price');
  assert.deepStrictEqual(r.applied, { q: 'a', categoryId: 2, min: null, max: null });
  assert.deepStrictEqual(r.filters, { q: 'a', category: '2', min: '200000', max: '100000' }); // shown again in the form
  assert.strictEqual(validateFilters({ min: '129000', max: '129000' }).error, null);
});

// ---------- INT: US-13/AC-01 ----------
test('TC-F5 US-13/AC-01 category Novel + 50,000–150,000 VND → only visible Novel books in range, newest first', async () => {
  const r = await catalog.listBooksPage(1, { category: String(novelId), min: '50000', max: '150000' });
  const want = await expected({ categoryId: novelId, min: 50000, max: 150000 });
  assert.ok(want.length > 0, 'seed data has Novel books in this range');
  assert.deepStrictEqual(ids(r), want.slice(0, 12));
  assert.strictEqual(r.total, want.length);
  assert.strictEqual(r.error, null);
  for (const b of r.books) {
    assert.strictEqual(b.category_name, 'Novel');
    assert.ok(Number(b.price) >= 50000 && Number(b.price) <= 150000, `${b.title} ${b.price}`);
  }
});

test('US-13/AC-01 a hidden book is never returned by the filter', async () => {
  const [first] = await expected({ categoryId: novelId, min: 50000, max: 150000 });
  await catalog.hideBook(first);
  try {
    const r = await catalog.listBooksPage(1, { category: String(novelId), min: '50000', max: '150000' });
    assert.ok(!ids(r).includes(first));
  } finally {
    await pool.query('UPDATE books SET is_deleted = false WHERE id = $1', [first]);
  }
});

test('US-13/AC-01 only a category, only a min, only a max each filter on their own', async () => {
  assert.deepStrictEqual(ids(await catalog.listBooksPage(1, { category: String(novelId) }, 100)), await expected({ categoryId: novelId }));
  assert.deepStrictEqual(ids(await catalog.listBooksPage(1, { min: '150000' }, 100)), await expected({ min: 150000 }));
  assert.deepStrictEqual(ids(await catalog.listBooksPage(1, { max: '100000' }, 100)), await expected({ max: 100000 }));
});

test('US-13 unknown category id → empty list, no error (the shop never fails on an old link)', async () => {
  const r = await catalog.listBooksPage(1, { category: '99999' });
  assert.deepStrictEqual([r.total, r.books.length, r.page, r.error], [0, 0, 1, null]);
});

// ---------- INT: US-13/AC-04 (boundary) ----------
test('TC-F5 US-13/AC-04 a book priced exactly at the min or the max bound is included', async () => {
  const { rows: [b] } = await pool.query("SELECT id, price FROM books WHERE seed_key = 'seed-01'"); // 129,000 VND
  const p = String(Math.round(Number(b.price)));
  assert.ok(ids(await catalog.listBooksPage(1, { min: p }, 100)).includes(b.id), 'min = price');
  assert.ok(ids(await catalog.listBooksPage(1, { max: p }, 100)).includes(b.id), 'max = price');
  assert.ok(ids(await catalog.listBooksPage(1, { min: p, max: p }, 100)).includes(b.id), 'min = max = price');
  assert.ok(!ids(await catalog.listBooksPage(1, { min: String(Number(p) + 1) }, 100)).includes(b.id), 'min = price + 1');
  assert.ok(!ids(await catalog.listBooksPage(1, { max: String(Number(p) - 1) }, 100)).includes(b.id), 'max = price − 1');
});

// ---------- INT: US-13/AC-03 ----------
test('TC-F5 US-13/AC-03 min > max → message and the price range is not applied (category still is)', async () => {
  const r = await catalog.listBooksPage(1, { category: String(novelId), min: '200000', max: '100000' }, 100);
  assert.strictEqual(r.error, 'Minimum price must not exceed maximum price');
  assert.deepStrictEqual(ids(r), await expected({ categoryId: novelId }));
  assert.deepStrictEqual([r.filters.min, r.filters.max], ['200000', '100000']);
});

// ---------- INT: US-13/AC-02 ----------
test('TC-F5 US-13/AC-02 search + filter with more than 12 results: page 2 keeps them and continues the list', async () => {
  const query = { q: 'e', min: '50000', max: '500000' };
  const all = (await catalog.listBooksPage(1, query, 100)).books.map((b) => b.id);
  assert.ok(all.length > 12, `need > 12 results, got ${all.length}`);
  const p1 = await catalog.listBooksPage(1, query);
  const p2 = await catalog.listBooksPage(2, query);
  assert.deepStrictEqual(ids(p1), all.slice(0, 12));
  assert.deepStrictEqual(ids(p2), all.slice(12, 24));
  assert.deepStrictEqual([p2.page, p2.total], [2, all.length]);
  assert.deepStrictEqual(p2.filters, { q: 'e', category: '', min: '50000', max: '500000' });
  assert.strictEqual(listQueryString({ ...query, page: 2 }), 'q=e&min=50000&max=500000&page=2');
});

test('US-12 + US-13 keyword, category and price combine: austen + Novel + max 125,000 → Emma only', async () => {
  const r = await catalog.listBooksPage(1, { q: 'austen', category: String(novelId), max: '125000' });
  assert.deepStrictEqual(r.books.map((b) => b.title), ['Emma']);
});
