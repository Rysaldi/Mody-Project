const jwt = require("jsonwebtoken");
const secretKey = process.env.secret_key;

const createToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { createToken, verifyToken };
