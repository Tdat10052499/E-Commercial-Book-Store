// Integration tests for US-25 (CR-06) "Last updated by <name> at <time>" – S3-T05 (data model) and S3-T07 (store + show).
// Test cases TC-CR-06…08 in pm/sprints/S3/test-cases-F4F5.md. Real PostgreSQL database (TEST_DATABASE_URL).
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://bookstore:bookstore@localhost:5432/bookstore_test';
const test = require('node:test');
const assert = require('node:assert');
const { pool } = require('../lib/db');
const { migrate } = require('../db/migrate');
const catalog = require('../lib/catalog');
const users = require('../lib/users');

const JPG = { data: Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0]), type: 'image/jpeg' };
const LINE = /^Last updated by (.+) at (\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;

let authorId;
let categoryId;
let admin;
let staff;
const input = (over = {}) => ({
  title: 'Emma', author_id: String(authorId), category_id: String(categoryId),
  price: '120000', description: 'Novel', stock: '5', ...over,
});

test.before(async () => {
  delete process.env.ADMIN_EMAIL;
  await migrate();
  await pool.query('TRUNCATE books, authors, categories, sessions, users RESTART IDENTITY CASCADE');
  authorId = (await catalog.createAuthor({ name: 'Jane Austen' })).author.id;
  categoryId = (await catalog.createCategory({ name: 'Classics' })).category.id;
  admin = (await users.createAccount({ name: 'Admin', email: 'admin@x.com', password: 'Admin2026x', role: 'admin' })).user;
  staff = (await users.createAccount({ name: 'Staff One', email: 'staff1@x.com', password: 'Staff2026x', role: 'staff' })).user;
});

test.after(() => pool.end());

// ---------- S3-T05: data model ----------
test('US-25 (S3-T05) migration is safe to run twice and old rows default to "System"', async () => {
  await pool.query("INSERT INTO books (title, price, stock) VALUES ('Pre-existing', 1000, 1)");
  await migrate();
  await migrate();
  const { rows } = await pool.query(
    "SELECT column_name, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'books' AND column_name = 'updated_by_name'"
  );
  assert.strictEqual(rows.length, 1);
  assert.strictEqual(rows[0].is_nullable, 'NO');
  const old = (await pool.query("SELECT updated_by_name FROM books WHERE title = 'Pre-existing'")).rows[0];
  assert.strictEqual(old.updated_by_name, 'System');
});

// ---------- S3-T07: store and show ----------
test('US-25/AC-01 (TC-CR-06) Staff edits a book → its page shows "Last updated by Staff One at <save time>"', async () => {
  const { book } = await catalog.createBook(input(), JPG, admin);
  assert.strictEqual((await catalog.getBook(book.id)).updated_by_name, 'Admin', 'add stores the creator');

  const before = Date.now();
  const res = await catalog.updateBook(book.id, input({ price: '99000' }), null, staff);
  assert.ok(!res.errors);
  const saved = await catalog.getBook(book.id);
  assert.strictEqual(saved.updated_by_name, 'Staff One');
  assert.ok(saved.updated_at.getTime() >= before - 1000, 'time is the time of the save');

  const line = catalog.formatLastUpdated(saved.updated_by_name, saved.updated_at);
  const m = line.match(LINE);
  assert.ok(m, `format is "Last updated by <name> at dd/mm/yyyy HH:mm": ${line}`);
  assert.strictEqual(m[1], 'Staff One');
});

test('US-25/AC-01 an unchanged save does not overwrite the last editor (US-06/AC-04)', async () => {
  const { book } = await catalog.createBook(input({ title: 'Persuasion' }), JPG, staff);
  const res = await catalog.updateBook(book.id, input({ title: 'Persuasion' }), null, admin);
  assert.strictEqual(res.unchanged, true);
  assert.strictEqual((await catalog.getBook(book.id)).updated_by_name, 'Staff One');
});

test('US-25/AC-01 time is shown in GMT+7 as dd/mm/yyyy HH:mm', () => {
  // 2026-11-08 15:05 UTC = 08/11/2026 22:05 in Ho Chi Minh City
  assert.strictEqual(catalog.formatLastUpdated('Staff One', new Date('2026-11-08T15:05:00Z')),
    'Last updated by Staff One at 08/11/2026 22:05');
  // midnight rollover: 2026-11-11 17:30 UTC = 12/11/2026 00:30
  assert.strictEqual(catalog.formatLastUpdated('Admin', '2026-11-11T17:30:00Z'), 'Last updated by Admin at 12/11/2026 00:30');
});

test('US-25/AC-02 (TC-CR-07) a seed book never edited shows "System" at its seed time', async () => {
  const seedTime = new Date('2026-10-30T03:00:00Z');
  const { rows } = await pool.query(
    "INSERT INTO books (title, price, stock, seed_key, created_at, updated_at) VALUES ('Meditations', 90000, 3, 'test-seed', $1, $1) RETURNING id",
    [seedTime]
  );
  const book = await catalog.getBook(rows[0].id);
  assert.strictEqual(book.updated_by_name, 'System');
  assert.strictEqual(catalog.formatLastUpdated(book.updated_by_name, book.updated_at), 'Last updated by System at 30/10/2026 10:00');
  assert.strictEqual(catalog.formatLastUpdated(null, seedTime), 'Last updated by System at 30/10/2026 10:00', 'missing name falls back to System');
});

test('US-25/AC-03 (TC-CR-08) renaming and then locking the editor keeps the stored name', async () => {
  const { book } = await catalog.createBook(input({ title: 'Mansfield Park' }), JPG, admin);
  await catalog.updateBook(book.id, input({ title: 'Mansfield Park', stock: '7' }), null, staff);
  await pool.query("UPDATE users SET name = 'Staff Two' WHERE id = $1", [staff.id]);
  const locked = await users.setUserStatus(admin.id, staff.id, 'locked');
  assert.ok(!locked?.error, 'admin can lock the Staff account');
  const after = await catalog.getBook(book.id);
  assert.strictEqual(after.updated_by_name, 'Staff One');
  assert.match(catalog.formatLastUpdated(after.updated_by_name, after.updated_at), /^Last updated by Staff One at /);
});

test('US-25 a call without a user (scripts) is recorded as "System"; long names are cut to 100 chars', async () => {
  const { book } = await catalog.createBook(input({ title: 'Sanditon' }), JPG);
  assert.strictEqual((await catalog.getBook(book.id)).updated_by_name, 'System');
  await catalog.updateBook(book.id, input({ title: 'Sanditon', stock: '1' }), null, { name: 'x'.repeat(150) });
  assert.strictEqual((await catalog.getBook(book.id)).updated_by_name.length, 100);
});
