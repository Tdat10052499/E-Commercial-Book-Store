const crypto = require('node:crypto');
const { pool } = require('./db');

const SESSION_DAYS = 7;

async function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 864e5);
  await pool.query('INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3)', [token, userId, expiresAt]);
  return { token, expiresAt };
}

// Returns the user only while the session is valid and the account is active (US-03/AC-05).
async function findSessionUser(token) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const { rows } = await pool.query(
    `SELECT u.id, u.name, u.email, u.role, u.status
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token = $1 AND s.expires_at > now()`,
    [token]
  );
  const user = rows[0];
  if (!user || user.status !== 'active') {
    if (user) await deleteSession(token);
    return null;
  }
  return user;
}

const deleteSession = (token) => pool.query('DELETE FROM sessions WHERE token = $1', [token]);

module.exports = { createSession, findSessionUser, deleteSession, SESSION_DAYS };
