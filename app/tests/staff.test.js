// Integration tests for CR-06 / US-24 Store Staff against a real PostgreSQL database (TEST_DATABASE_URL).
// The HTTP 403 answers themselves (server actions, /admin/accounts) are checked in a browser by e2e/f1.e2e.js.
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://bookstore:bookstore@localhost:5432/bookstore_test';
const test = require('node:test');
const assert = require('node:assert');
const { pool } = require('../lib/db');
const { migrate } = require('../db/migrate');
const users = require('../lib/users');
const session = require('../lib/session');
const catalog = require('../lib/catalog');
const { can, isCatalogEditor, CATALOG_EDITORS } = require('../lib/permissions');

const CHECK_VIOLATION = '23514';
const pw = 'Staff2026x';
let admin;
let customer;

test.before(async () => {
  delete process.env.ADMIN_EMAIL;
  await migrate();
  await pool.query('TRUNCATE users, books, authors, categories RESTART IDENTITY CASCADE');
});
test.after(() => pool.end());

// ---------- S2-T16 C1: role + migration ----------
test('US-24 (C1) migration upgrades an old database: two-role CHECK is replaced and accepts staff', async () => {
  // Simulate a database created in Sprint 1 (CHECK without 'staff').
  await pool.query('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check');
  await pool.query("ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'customer'))");
  await assert.rejects(
    pool.query("INSERT INTO users (name, email, password_hash, role) VALUES ('S', 'old@x.com', 'h', 'staff')"),
    (err) => err.code === CHECK_VIOLATION,
  );
  await migrate(); // runs on every deploy (vercel-build)
  await migrate(); // and is idempotent
  const { rows } = await pool.query("SELECT pg_get_constraintdef(oid) AS def FROM pg_constraint WHERE conname = 'users_role_check'");
  assert.strictEqual(rows.length, 1);
  assert.match(rows[0].def, /staff/);
});

test('US-24 (C1) role CHECK accepts admin/staff/customer and rejects anything else at the database level', async () => {
  for (const role of ['admin', 'staff', 'customer']) {
    await pool.query('INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)', [role, `chk-${role}@x.com`, 'h', role]);
  }
  await assert.rejects(
    pool.query("INSERT INTO users (name, email, password_hash, role) VALUES ('M', 'chk-m@x.com', 'h', 'manager')"),
    (err) => err.code === CHECK_VIOLATION,
  );
  await pool.query("DELETE FROM users WHERE email LIKE 'chk-%'");
});

// ---------- S2-T18 C3: admin assigns / changes role ----------
test('US-24 (C3) admin creates a Store Staff account directly', async () => {
  admin = (await users.createAccount({ name: 'Admin', email: 'admin@x.com', password: 'Admin2026x', role: 'admin' })).user;
  const { user, errors } = await users.createAccount({ name: 'Staff One', email: 'staff1@x.com', password: pw, role: 'staff' });
  assert.strictEqual(errors, undefined);
  assert.strictEqual(user.role, 'staff');
  assert.ok((await users.authenticate('staff1@x.com', pw)).user);
});

test('US-24/AC-04 setUserRole refuses own role, invalid role, unknown or non-numeric id', async () => {
  customer = (await users.registerUser({ name: 'Cust', email: 'cust@x.com', password: pw })).user;
  assert.strictEqual((await users.setUserRole(admin.id, admin.id, 'customer')).error, 'You cannot change your own role');
  assert.strictEqual((await users.setUserRole(admin.id, customer.id, 'manager')).error, 'Invalid role');
  assert.strictEqual((await users.setUserRole(admin.id, 99999, 'staff')).error, 'Account not found');
  assert.strictEqual((await users.setUserRole(admin.id, 'abc', 'staff')).error, 'Account not found');
  const { rows } = await pool.query('SELECT role FROM users WHERE id = $1', [admin.id]);
  assert.strictEqual(rows[0].role, 'admin');
});

test('US-24/AC-04 Customer → Staff: open sessions end; at the next login the user is Staff', async () => {
  const s1 = await session.createSession(customer.id);
  const s2 = await session.createSession(customer.id); // e.g. phone + laptop
  assert.strictEqual((await session.findSessionUser(s1.token)).role, 'customer');

  assert.deepStrictEqual(await users.setUserRole(admin.id, customer.id, 'staff'), { ok: true });
  assert.strictEqual(await session.findSessionUser(s1.token), null);
  assert.strictEqual(await session.findSessionUser(s2.token), null);

  const { user } = await users.authenticate('cust@x.com', pw);
  assert.strictEqual(user.role, 'staff');
  const fresh = await session.createSession(user.id);
  const sessionUser = await session.findSessionUser(fresh.token);
  assert.strictEqual(sessionUser.role, 'staff');
  assert.ok(isCatalogEditor(sessionUser));
  assert.ok(!can(sessionUser.role, 'manageAccounts'));
});

test('US-24/AC-04 same role again → unchanged, sessions are kept', async () => {
  const s = await session.createSession(customer.id);
  assert.deepStrictEqual(await users.setUserRole(admin.id, customer.id, 'staff'), { ok: true, unchanged: true });
  assert.ok(await session.findSessionUser(s.token));
});

test('US-24/AC-04 Staff → Customer removes back-office rights at the next login', async () => {
  await users.setUserRole(admin.id, customer.id, 'customer');
  const { user } = await users.authenticate('cust@x.com', pw);
  assert.strictEqual(user.role, 'customer');
  assert.ok(!isCatalogEditor(user));
  await users.setUserRole(admin.id, customer.id, 'staff'); // back to Staff for the next tests
});

// ---------- S2-T17 C2: permission matrix used by the server guards ----------
test('US-24/AC-01…AC-03, AC-05 permission matrix (lib/permissions.js, used by requireCatalogEditor)', () => {
  assert.deepStrictEqual(CATALOG_EDITORS, ['admin', 'staff']);
  const matrix = {
    admin: { editCatalog: true, hideBook: true, removeCategoryOrAuthor: true, manageAccounts: true },
    staff: { editCatalog: true, hideBook: false, removeCategoryOrAuthor: false, manageAccounts: false },
    customer: { editCatalog: false, hideBook: false, removeCategoryOrAuthor: false, manageAccounts: false },
  };
  for (const [role, actions] of Object.entries(matrix)) {
    for (const [action, allowed] of Object.entries(actions)) {
      assert.strictEqual(can(role, action), allowed, `${role} ${action}`);
    }
  }
  assert.strictEqual(can('staff', 'unknownAction'), false);
  assert.strictEqual(isCatalogEditor(null), false);
  assert.strictEqual(isCatalogEditor({ role: 'customer' }), false);
});

// ---------- S2-T19 C4: Staff work on the catalogue ----------
test('US-24/AC-01 a Staff user (by role) can add a valid book; AC-05 add/edit categories and authors', async () => {
  const { user: staff } = await users.authenticate('staff1@x.com', pw);
  assert.ok(isCatalogEditor(staff));
  const cat = await catalog.createCategory({ name: 'Staff category' });
  const au = await catalog.createAuthor({ name: 'Staff author' });
  assert.ok(cat.category && au.author);
  assert.strictEqual((await catalog.renameCategory(cat.category.id, { name: 'Staff category 2' })).errors, undefined);
  assert.strictEqual((await catalog.updateAuthor(au.author.id, { name: 'Staff author 2', bio: '' })).errors, undefined);

  const cover = Buffer.alloc(512); Buffer.from([0xff, 0xd8, 0xff]).copy(cover);
  const input = { title: 'Added by staff', author_id: String(au.author.id), category_id: String(cat.category.id), price: '50000', description: '', stock: '5' };
  const { book, errors } = await catalog.createBook(input, { data: cover, type: 'image/jpeg' });
  assert.strictEqual(errors, undefined);
  assert.strictEqual((await catalog.listBooksPage(1)).books[0].id, book.id);

  const edit = await catalog.updateBook(book.id, { ...input, price: '55000' }, null);
  assert.strictEqual(edit.errors, undefined);
  assert.strictEqual((await catalog.getBook(book.id)).price, '55000.00');
});
