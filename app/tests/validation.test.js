const test = require('node:test');
const assert = require('node:assert');
const { validateAccount, validatePassword, normalizeEmail } = require('../lib/validation');

const valid = { name: 'An', email: 'an@example.com', password: 'abcd1234' };

test('US-01/AC-04 password boundary: 7 rejected, 8 accepted', () => {
  assert.ok(validatePassword('abc1234'));
  assert.strictEqual(validatePassword('abcd1234'), null);
});

test('US-01/AC-04 password needs letter and digit', () => {
  assert.ok(validatePassword('abcdefgh'));
  assert.ok(validatePassword('12345678'));
});

test('US-01/AC-07 max lengths +1 rejected', () => {
  assert.ok(validateAccount({ ...valid, name: 'x'.repeat(101) }).name);
  assert.strictEqual(validateAccount({ ...valid, name: 'x'.repeat(100) }).name, undefined);
  assert.ok(validatePassword('a1'.repeat(32) + 'x'));
  assert.strictEqual(validatePassword('a1'.repeat(32)), null);
});

test('US-01/AC-03 invalid email and empty fields rejected', () => {
  const e = validateAccount({ name: ' ', email: 'not-an-email', password: '' });
  assert.ok(e.name && e.email && e.password);
});

test('US-02/AC-05 email normalised (trim + lower-case)', () => {
  assert.strictEqual(normalizeEmail('  An@Example.COM '), 'an@example.com');
});

test('US-03/AC-01 role must be admin or customer when required', () => {
  assert.ok(validateAccount({ ...valid, role: 'staff' }, { requireRole: true }).role);
  assert.deepStrictEqual(validateAccount({ ...valid, role: 'admin' }, { requireRole: true }), {});
});
