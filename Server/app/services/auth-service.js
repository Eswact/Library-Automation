const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
// or
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');

function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey);
}

module.exports = { generateToken };
