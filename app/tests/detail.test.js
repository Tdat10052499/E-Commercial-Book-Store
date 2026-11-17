// Integration tests for US-11 Book detail (data layer used by /books/[id]) against a real PostgreSQL database.
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://bookstore:bookstore@localhost:5432/bookstore_test';
const test = require('node:test');
const assert = require('node:assert');
const { pool } = require('../lib/db');
const { migrate } = require('../db/migrate');
const { seed } = require('../db/seed');
const catalog = require('../lib/catalog');

const idOf = async (title) => (await pool.query('SELECT id FROM books WHERE title = $1', [title])).rows[0].id;

test.before(async () => {
  delete process.env.ADMIN_EMAIL;
  await migrate();
  await pool.query('TRUNCATE books, authors, categories RESTART IDENTITY CASCADE');
  await seed();
});
test.after(() => pool.end());

test('US-11/AC-01 detail shows cover, title, author, category, price, description and stock (TC-F4-01)', async () => {
  const book = await catalog.getBook(await idOf('Pride and Prejudice'));
  assert.strictEqual(book.title, 'Pride and Prejudice');
  assert.strictEqual(book.author_name, 'Jane Austen');
  assert.strictEqual(book.category_name, 'Novel');
  assert.strictEqual(Number(book.price), 129000);
  assert.strictEqual(book.stock, 25);
  assert.ok(book.description && book.description.length > 0, 'description is returned');
  assert.ok(book.cover_url || book.has_upload, 'a cover source is returned');
});

test('US-11/AC-01 a book with stock 0 is still shown, with stock 0 (TC-F4-01)', async () => {
  const book = await catalog.getBook(await idOf('A Tale of Two Cities'));
  assert.ok(book);
  assert.strictEqual(book.stock, 0);
});

test('US-11/AC-01 every book on a catalogue page opens its own detail', async () => {
  const { books } = await catalog.listBooksPage(2);
  assert.strictEqual(books.length, 12);
  for (const card of books) {
    const book = await catalog.getBook(card.id);
    assert.strictEqual(book.id, card.id);
    assert.strictEqual(book.title, card.title);
  }
});

test('US-11/AC-03 missing, hidden or non-numeric id → not available (TC-F4-03, TC-F2-11)', async () => {
  const hiddenId = await idOf('Emma');
  await pool.query('UPDATE books SET is_deleted = true WHERE id = $1', [hiddenId]);
  for (const id of [99999, String(hiddenId), 'abc', '-1', '1.5', '', ' 1', '1; DROP TABLE books', undefined]) {
    assert.strictEqual(await catalog.getBook(id), null, `id ${JSON.stringify(id)} must not show a book`);
  }
  const { rows } = await pool.query('SELECT count(*)::int AS n FROM books');
  assert.strictEqual(rows[0].n, 30, 'nothing was changed by the odd ids');
});
