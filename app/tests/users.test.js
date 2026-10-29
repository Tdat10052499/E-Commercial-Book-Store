// Integration tests against a real PostgreSQL database (TEST_DATABASE_URL).
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://bookstore:bookstore@localhost:5432/bookstore_test';
const test = require('node:test');
const assert = require('node:assert');
const { pool } = require('../lib/db');
const { migrate } = require('../db/migrate');
const users = require('../lib/users');
const session = require('../lib/session');

test.before(async () => {
  delete process.env.ADMIN_EMAIL;
  await migrate();
  await pool.query('TRUNCATE users RESTART IDENTITY CASCADE');
});
test.after(() => pool.end());

const input = { name: 'Customer One', email: 'One@Example.com', password: 'secret123' };

test('US-01/AC-01 register creates a Customer', async () => {
  const { user, errors } = await users.registerUser(input);
  assert.strictEqual(errors, undefined);
  assert.strictEqual(user.role, 'customer');
  assert.strictEqual(user.email, 'one@example.com');
});

test('US-01/AC-05 only a bcrypt hash is stored', async () => {
  const { rows } = await pool.query("SELECT password_hash FROM users WHERE email = 'one@example.com'");
  assert.notStrictEqual(rows[0].password_hash, input.password);
  assert.match(rows[0].password_hash, /^\$2[aby]\$10\$/);
});

test('US-01/AC-02 duplicate email (any case) refused', async () => {
  const { errors } = await users.registerUser({ ...input, email: 'ONE@example.com' });
  assert.strictEqual(errors.email, 'Email is already registered');
});

test('US-01/AC-06 server rejects invalid input even without client checks', async () => {
  const { errors } = await users.registerUser({ name: '', email: 'x', password: '1' });
  assert.ok(errors.name && errors.email && errors.password);
  const { rows } = await pool.query('SELECT count(*)::int AS n FROM users');
  assert.strictEqual(rows[0].n, 1);
});

test('US-02/AC-01, AC-05 login with correct password, trimmed mixed-case email', async () => {
  const { user } = await users.authenticate('  ONE@example.com ', input.password);
  assert.ok(user && !('password_hash' in user));
});

test('US-02/AC-02 wrong password and unknown email give the same generic error', async () => {
  const a = await users.authenticate(input.email, 'wrong-pass1');
  const b = await users.authenticate('nobody@example.com', 'wrong-pass1');
  assert.strictEqual(a.error, 'Invalid email or password');
  assert.strictEqual(b.error, a.error);
});

test('US-03/AC-01 admin creates account with role', async () => {
  const { user } = await users.createAccount({ name: 'Admin', email: 'admin@example.com', password: 'admin1234', role: 'admin' });
  assert.strictEqual(user.role, 'admin');
  assert.strictEqual(user.status, 'active');
});

test('US-03/AC-04 admin create with existing email refused', async () => {
  const { errors } = await users.createAccount({ ...input, role: 'customer' });
  assert.ok(errors.email);
});

test('US-03/AC-02, US-02/AC-03, US-03/AC-05 lock ends sessions and blocks login; unlock restores', async () => {
  const [admin, customer] = (await users.listUsers()).sort((a, b) => (a.role === 'admin' ? -1 : 1));
  const s = await session.createSession(customer.id);
  assert.ok(await session.findSessionUser(s.token));

  assert.deepStrictEqual(await users.setUserStatus(admin.id, customer.id, 'locked'), { ok: true });
  assert.strictEqual(await session.findSessionUser(s.token), null);
  assert.match((await users.authenticate(input.email, input.password)).error, /locked/);

  await users.setUserStatus(admin.id, customer.id, 'active');
  assert.ok((await users.authenticate(input.email, input.password)).user);
});

test('US-03/AC-03 admin cannot lock own account', async () => {
  const admin = (await users.listUsers()).find((u) => u.role === 'admin');
  const r = await users.setUserStatus(admin.id, admin.id, 'locked');
  assert.strictEqual(r.error, 'You cannot lock your own account');
});
