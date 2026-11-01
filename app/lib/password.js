const bcrypt = require('bcryptjs');

const COST = 10; // NFR-01/AC-01: bcrypt cost >= 10

const hashPassword = (plain) => bcrypt.hash(plain, COST);
const verifyPassword = (plain, hash) => bcrypt.compare(plain, hash);

module.exports = { hashPassword, verifyPassword, COST };
