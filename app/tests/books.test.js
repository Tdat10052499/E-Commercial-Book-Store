// Integration tests for US-05 (add), US-06 (edit) and US-07 (hide) against a real PostgreSQL database (TEST_DATABASE_URL).
// Role checks (who may call these) live in the server actions and are covered by tests/staff.test.js and e2e/f1.e2e.js.
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://bookstore:bookstore@localhost:5432/bookstore_test';
const test = require('node:test');
const assert = require('node:assert');
const { pool } = require('../lib/db');
const { migrate } = require('../db/migrate');
const catalog = require('../lib/catalog');
const { COVER } = require('../lib/catalog-validation');

const MB2 = COVER.maxBytes; // 2 * 1024 * 1024
const JPG_SIG = [0xff, 0xd8, 0xff, 0xe0];
const PNG_SIG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
// A buffer of `size` bytes that starts with a real JPG/PNG signature (content after it does not matter for the check).
function imageOf(size, sig = JPG_SIG) {
  const buf = Buffer.alloc(size, 0);
  Buffer.from(sig).copy(buf);
  return buf;
}
const jpg = (size = 1024) => ({ data: imageOf(size), type: 'image/jpeg' });
const png = (size = 1024) => ({ data: imageOf(size, PNG_SIG), type: 'image/png' });

let authorId;
let categoryId;
const valid = () => ({
  title: 'Dế Mèn phiêu lưu ký', author_id: String(authorId), category_id: String(categoryId),
  price: '85000', description: 'Classic', stock: '10',
});
const countBooks = async () => (await pool.query('SELECT count(*)::int AS n FROM books')).rows[0].n;
const row = async (id) => (await pool.query('SELECT * FROM books WHERE id = $1', [id])).rows[0];

test.before(async () => {
  delete process.env.ADMIN_EMAIL;
  await migrate();
  await pool.query('TRUNCATE books, authors, categories RESTART IDENTITY CASCADE');
  authorId = (await catalog.createAuthor({ name: 'Tô Hoài' })).author.id;
  categoryId = (await catalog.createCategory({ name: 'Children' })).category.id;
  // An older book, so "appears first" is a real ordering check.
  await pool.query(`INSERT INTO books (title, price, stock, created_at) VALUES ('Older book', 1000, 1, now() - interval '1 day')`);
});
test.after(() => pool.end());

// ---------- US-05 Add book ----------
test('US-05/AC-01 valid book with JPG cover is saved and is first in the newest-first lists', async () => {
  const { book, errors } = await catalog.createBook(valid(), jpg());
  assert.strictEqual(errors, undefined);
  const saved = await row(book.id);
  assert.strictEqual(saved.title, 'Dế Mèn phiêu lưu ký');
  assert.strictEqual(saved.price, '85000.00');
  assert.strictEqual(saved.stock, 10);
  assert.strictEqual(saved.cover_mime, 'image/jpeg');
  assert.strictEqual(saved.is_deleted, false);
  assert.strictEqual((await catalog.listAdminBooks())[0].id, book.id);
  assert.strictEqual((await catalog.listBooksPage(1)).books[0].id, book.id);
});

test('US-05/AC-02 price 0, negative or not a number → "Price must be greater than 0", nothing saved', async () => {
  const before = await countBooks();
  for (const price of ['0', '0.00', '-5', 'abc', '']) {
    const { errors } = await catalog.createBook({ ...valid(), price }, jpg());
    assert.strictEqual(errors.price, 'Price must be greater than 0', `price=${price}`);
  }
  assert.strictEqual(await countBooks(), before);
});

test('US-05/AC-03 missing title, author or category → field-level errors, nothing saved', async () => {
  const before = await countBooks();
  const { errors } = await catalog.createBook({ ...valid(), title: '   ', author_id: '', category_id: '' }, jpg());
  assert.deepStrictEqual(Object.keys(errors).sort(), ['author_id', 'category_id', 'title']);
  assert.strictEqual(await countBooks(), before);
});

test('US-05/AC-03 author or category that no longer exists → form error, nothing saved', async () => {
  const before = await countBooks();
  const { errors } = await catalog.createBook({ ...valid(), author_id: '99999' }, jpg());
  assert.strictEqual(errors.form, 'The selected author or category no longer exists');
  assert.strictEqual(await countBooks(), before);
});

test('US-05/AC-04 boundary: price 0.01 and stock 0 accepted', async () => {
  const { book, errors } = await catalog.createBook({ ...valid(), title: 'Boundary', price: '0.01', stock: '0' }, png());
  assert.strictEqual(errors, undefined);
  const saved = await row(book.id);
  assert.deepStrictEqual([saved.price, saved.stock, saved.cover_mime], ['0.01', 0, 'image/png']);
});

test('US-05/AC-04 boundary: cover of exactly 2 MB accepted, 2 MB + 1 byte rejected', async () => {
  const ok = await catalog.createBook({ ...valid(), title: 'Exactly 2 MB' }, jpg(MB2));
  assert.strictEqual(ok.errors, undefined);
  assert.strictEqual((await row(ok.book.id)).cover_data.length, MB2);
  const before = await countBooks();
  const big = await catalog.createBook({ ...valid(), title: 'Too big' }, jpg(MB2 + 1));
  assert.strictEqual(big.errors.cover, 'Cover must be at most 2 MB');
  assert.strictEqual(await countBooks(), before);
});

test('US-05/AC-04 non-image file rejected: wrong declared type, and a renamed file with a fake image/png type', async () => {
  const before = await countBooks();
  const pdf = await catalog.createBook(valid(), { data: Buffer.from('%PDF-1.7 ...'), type: 'application/pdf' });
  assert.strictEqual(pdf.errors.cover, 'Cover must be a JPG or PNG image');
  const renamed = await catalog.createBook(valid(), { data: Buffer.from('just text, not an image'), type: 'image/png' });
  assert.strictEqual(renamed.errors.cover, 'Cover must be a JPG or PNG image');
  const gif = await catalog.createBook(valid(), { data: Buffer.from('GIF89a......'), type: 'image/gif' });
  assert.strictEqual(gif.errors.cover, 'Cover must be a JPG or PNG image');
  assert.strictEqual(await countBooks(), before);
});

test('US-05/AC-01 cover is required when adding a book', async () => {
  const before = await countBooks();
  assert.strictEqual((await catalog.createBook(valid(), null)).errors.cover, 'Cover image is required');
  assert.strictEqual(await countBooks(), before);
});

test('US-05 signature check: coverMimeFromBytes recognises JPG/PNG only', () => {
  assert.strictEqual(catalog.coverMimeFromBytes(imageOf(8)), 'image/jpeg');
  assert.strictEqual(catalog.coverMimeFromBytes(imageOf(8, PNG_SIG)), 'image/png');
  assert.strictEqual(catalog.coverMimeFromBytes(Buffer.from([0xff, 0xd8])), null);
  assert.strictEqual(catalog.coverMimeFromBytes(Buffer.from('hello world')), null);
});

// ---------- US-06 Edit book ----------
async function freshBook(title) {
  return (await catalog.createBook({ ...valid(), title }, jpg())).book.id;
}

test('US-06/AC-01 valid change is saved and shown in the admin list, the shop grid and getBook', async () => {
  const id = await freshBook('Edit me');
  const { errors, unchanged } = await catalog.updateBook(id, { ...valid(), title: 'Edited title', price: '99000.50', stock: '3' }, null);
  assert.strictEqual(errors, undefined);
  assert.strictEqual(unchanged, undefined);
  const b = await catalog.getBook(id);
  assert.deepStrictEqual([b.title, b.price, b.stock], ['Edited title', '99000.50', 3]);
  assert.strictEqual((await catalog.listAdminBooks()).find((x) => x.id === id).title, 'Edited title');
  assert.strictEqual((await catalog.listBooksPage(1)).books.find((x) => x.id === id).title, 'Edited title');
});

test('US-06/AC-01 edit without a new cover keeps the old cover; a new PNG replaces it', async () => {
  const id = await freshBook('Cover keep');
  const oldCover = (await row(id)).cover_data;
  await catalog.updateBook(id, { ...valid(), title: 'Cover keep 2' }, null);
  assert.ok((await row(id)).cover_data.equals(oldCover));
  await catalog.updateBook(id, { ...valid(), title: 'Cover keep 2' }, png(2048));
  const r = await row(id);
  assert.strictEqual(r.cover_mime, 'image/png');
  assert.strictEqual(r.cover_data.length, 2048);
});

test('US-06/AC-02 invalid data (price ≤ 0, empty title, bad cover) refused; old values remain', async () => {
  const id = await freshBook('Keep old values');
  const before = await row(id);
  for (const [input, cover, field] of [
    [{ ...valid(), title: 'X', price: '0' }, null, 'price'],
    [{ ...valid(), title: 'X', price: '-1' }, null, 'price'],
    [{ ...valid(), title: '' }, null, 'title'],
    [{ ...valid(), title: 'X' }, jpg(MB2 + 1), 'cover'],
  ]) {
    const { errors } = await catalog.updateBook(id, input, cover);
    assert.ok(errors && errors[field], `expected error on ${field}`);
  }
  const after = await row(id);
  assert.deepStrictEqual(
    [after.title, after.price, after.stock, after.updated_at.getTime()],
    [before.title, before.price, before.stock, before.updated_at.getTime()],
  );
});

test('US-06/AC-03 unknown, hidden or non-numeric id → "Book not found"', async () => {
  const hiddenId = await freshBook('Hidden for edit');
  await catalog.hideBook(hiddenId);
  for (const id of [hiddenId, 99999, 'abc', '1; DROP TABLE books']) {
    assert.strictEqual(await catalog.getBook(id), null, `getBook(${id})`);
    const r = await catalog.updateBook(id, valid(), null);
    assert.strictEqual(r.notFound, true, `updateBook(${id})`);
    assert.strictEqual(r.errors.form, 'Book not found');
  }
  assert.strictEqual((await row(hiddenId)).title, 'Hidden for edit'); // hidden record not changed
});

test('US-06/AC-04 save without changes → book untouched (updated_at kept) and "unchanged" returned', async () => {
  const id = await freshBook('Unchanged');
  const before = await row(id);
  const b = await catalog.getBook(id);
  // Same values as the form would send back, incl. price as stored ("85000.00") and stock as text.
  const same = { title: b.title, author_id: String(b.author_id), category_id: String(b.category_id), price: b.price, description: b.description, stock: String(b.stock) };
  const r = await catalog.updateBook(id, same, null);
  assert.strictEqual(r.unchanged, true);
  assert.strictEqual((await row(id)).updated_at.getTime(), before.updated_at.getTime());
  // Surrounding spaces only are also "no change" (values are trimmed).
  assert.strictEqual((await catalog.updateBook(id, { ...same, title: `  ${b.title} ` }, null)).unchanged, true);
});

// ---------- US-07 Hide book (soft delete) ----------
test('US-07/AC-01 hidden book leaves the shop grid, admin list, getBook and cover route; record kept with is_deleted = true', async () => {
  const id = await freshBook('To hide');
  const total = (await catalog.listBooksPage(1)).total;
  assert.deepStrictEqual(await catalog.hideBook(id), { ok: true });
  assert.strictEqual((await catalog.listBooksPage(1)).total, total - 1);
  assert.ok(!(await catalog.listAdminBooks()).some((b) => b.id === id));
  assert.strictEqual(await catalog.getBook(id), null);
  assert.strictEqual(await catalog.getCover(id), null);
  const r = await row(id);
  assert.strictEqual(r.is_deleted, true);
  assert.strictEqual(r.title, 'To hide');
});

test('US-07/AC-01 hiding twice or an unknown id → "Book not found", no change', async () => {
  const id = await freshBook('Hide twice');
  await catalog.hideBook(id);
  assert.strictEqual((await catalog.hideBook(id)).error, 'Book not found');
  assert.strictEqual((await catalog.hideBook(99999)).error, 'Book not found');
  assert.strictEqual((await catalog.hideBook('abc')).error, 'Book not found');
});

// US-07/AC-02 (Cancel in the confirm dialog) is client-side only: covered by e2e/f1.e2e.js.
// US-07/AC-03 (customer opens the old detail URL): the detail page /books/[id] is US-11 (Sprint 3);
// here only the data layer is checked (getBook → null above).
