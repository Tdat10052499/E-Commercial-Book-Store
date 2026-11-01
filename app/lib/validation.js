// Shared by client components and server actions so both sides apply the same rules (NFR-01).
const LIMITS = { name: 100, email: 254, passwordMin: 8, passwordMax: 64 };
const ROLES = ['admin', 'customer'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (email) => String(email ?? '').trim().toLowerCase();

function validatePassword(password) {
  const p = String(password ?? '');
  if (!p) return 'Password is required';
  if (p.length < LIMITS.passwordMin) return `Password must be at least ${LIMITS.passwordMin} characters`;
  if (p.length > LIMITS.passwordMax) return `Password must be at most ${LIMITS.passwordMax} characters`;
  if (!/[A-Za-z]/.test(p) || !/\d/.test(p)) return 'Password must contain at least one letter and one digit';
  return null;
}

function validateAccount({ name, email, password, role }, { requireRole = false } = {}) {
  const errors = {};
  const n = String(name ?? '').trim();
  if (!n) errors.name = 'Name is required';
  else if (n.length > LIMITS.name) errors.name = `Name must be at most ${LIMITS.name} characters`;

  const e = normalizeEmail(email);
  if (!e) errors.email = 'Email is required';
  else if (e.length > LIMITS.email) errors.email = `Email must be at most ${LIMITS.email} characters`;
  else if (!EMAIL_RE.test(e)) errors.email = 'Email format is invalid';

  const pErr = validatePassword(password);
  if (pErr) errors.password = pErr;

  if (requireRole && !ROLES.includes(role)) errors.role = 'Role must be Administrator or Customer';
  return errors;
}

module.exports = { LIMITS, ROLES, normalizeEmail, validatePassword, validateAccount };
