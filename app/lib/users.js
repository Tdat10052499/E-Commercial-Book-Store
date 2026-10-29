const { pool } = require('./db');
const { hashPassword, verifyPassword } = require('./password');
const { normalizeEmail, validateAccount } = require('./validation');

const PUBLIC_COLUMNS = 'id, name, email, role, status, created_at';

async function insertUser({ name, email, password, role }) {
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)
       RETURNING ${PUBLIC_COLUMNS}`,
      [name.trim(), normalizeEmail(email), await hashPassword(password), role]
    );
    return { user: rows[0] };
  } catch (err) {
    if (err.code === '23505') return { errors: { email: 'Email is already registered' } };
    throw err;
  }
}

// US-01: self-registration always creates a Customer.
async function registerUser(input) {
  const errors = validateAccount(input);
  if (Object.keys(errors).length) return { errors };
  return insertUser({ ...input, role: 'customer' });
}

// US-03/AC-01: administrator creates an account with a chosen role.
async function createAccount(input) {
  const errors = validateAccount(input, { requireRole: true });
  if (Object.keys(errors).length) return { errors };
  return insertUser(input);
}

// US-02: generic message for unknown email or wrong password; locked accounts refused.
async function authenticate(email, password) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [normalizeEmail(email)]);
  const user = rows[0];
  if (!user || !(await verifyPassword(String(password ?? ''), user.password_hash))) {
    return { error: 'Invalid email or password' };
  }
  if (user.status === 'locked') {
    return { error: 'This account is locked. Please contact the administrator.' };
  }
  const { password_hash, ...safe } = user;
  return { user: safe };
}

async function listUsers() {
  const { rows } = await pool.query(`SELECT ${PUBLIC_COLUMNS} FROM users ORDER BY created_at DESC, id DESC`);
  return rows;
}

// US-03/AC-02, AC-03: lock/unlock other accounts, never your own.
async function setUserStatus(actorId, targetId, status) {
  if (!['active', 'locked'].includes(status)) return { error: 'Invalid status' };
  if (Number(actorId) === Number(targetId)) return { error: 'You cannot lock your own account' };
  const { rowCount } = await pool.query('UPDATE users SET status = $1 WHERE id = $2', [status, targetId]);
  if (!rowCount) return { error: 'Account not found' };
  if (status === 'locked') await pool.query('DELETE FROM sessions WHERE user_id = $1', [targetId]);
  return { ok: true };
}

module.exports = { registerUser, createAccount, authenticate, listUsers, setUserStatus };
