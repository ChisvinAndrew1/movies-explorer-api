require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const { JWT_SECRET_DEV } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;
function auth(req, _res, next) {
  const token = req.cookies.jwt;
  const secret = NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV;
  if (!token) {
    return next(new Unauthorized());
  }

  let payload;
  try {
    payload = jsonwebtoken.verify(token, secret);
  } catch (err) {
    return next(new Unauthorized());
  }
  req.user = payload;

  return next();
}

module.exports = {
  auth,
};
