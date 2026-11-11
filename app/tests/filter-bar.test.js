// S3-T10: /books filter bar – page links keep the search and filter (US-13/AC-02), "Clear filters" only when a
// filter is set (US-12/AC-02), and the page passes the whole query to listBooksPage (search works from the URL).
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://bookstore:bookstore@localhost:5432/bookstore_test';
const test = require('node:test');
const assert = require('node:assert');
const { listPageHref, hasActiveFilters } = require('../lib/catalog-validation');

test('US-13/AC-02 page links keep q, category, min and max (TC-F5-05)', () => {
  const params = { q: 'e', min: '50000', max: '250000', page: '1' };
  assert.strictEqual(listPageHref(params, 2), '/books?q=e&min=50000&max=250000&page=2');
  assert.strictEqual(listPageHref({ ...params, category: '3' }, 3), '/books?q=e&category=3&min=50000&max=250000&page=3');
});

test('US-10 page 1 link has no page parameter; without filters the links are the old ones', () => {
  assert.strictEqual(listPageHref({ q: 'e', page: '2' }, 1), '/books?q=e');
  assert.strictEqual(listPageHref({}, 1), '/books');
  assert.strictEqual(listPageHref({}, 2), '/books?page=2');
});

test('US-13/AC-02 the page link drops unknown or invalid values', () => {
  assert.strictEqual(listPageHref({ q: '  e ', min: '-5', max: 'abc', category: 'x', utm: 'mail' }, 2), '/books?q=e&page=2');
});

test('US-12/AC-02 "Clear filters" shows only when a search or filter is set', () => {
  assert.strictEqual(hasActiveFilters({}), false);
  assert.strictEqual(hasActiveFilters({ page: '3' }), false, 'paging alone is not a filter');
  assert.strictEqual(hasActiveFilters({ q: '   ' }), false, 'blank keyword is not a filter');
  assert.strictEqual(hasActiveFilters({ q: 'austen' }), true);
  assert.strictEqual(hasActiveFilters({ category: '2' }), true);
  assert.strictEqual(hasActiveFilters({ min: '0' }), true);
  assert.strictEqual(hasActiveFilters({ max: '150000' }), true);
});

test('US-12 /books passes the whole URL query to listBooksPage: ?q=austen&page=1 → Jane Austen books', async () => {
  const { pool } = require('../lib/db');
  const { migrate } = require('../db/migrate');
  const { seed } = require('../db/seed');
  const catalog = require('../lib/catalog');
  try {
    await migrate();
    await pool.query('TRUNCATE books, authors, categories RESTART IDENTITY CASCADE');
    await seed();
    const params = { q: 'AUSTEN', page: '1' }; // exactly what the page receives from searchParams
    const { books, total, filters } = await catalog.listBooksPage(params.page, params);
    assert.strictEqual(total, 2);
    assert.deepStrictEqual(books.map((b) => b.title).sort(), ['Emma', 'Pride and Prejudice']);
    assert.strictEqual(filters.q, 'AUSTEN', 'the form is refilled with the keyword');
    const { categories } = await catalog.listCatalogOptions();
    assert.ok(categories.some((c) => c.name === 'Novel'), 'the category list feeds the filter dropdown');
  } finally {
    await pool.end();
  }
});
