const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../utils/constants');
const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  console.log(authorization);
  if (!authorization) {
    return (next(new AuthError('Необходима авторизация')));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret');
  } catch (err) {
    return (next(new AuthError('Необходима авторизация')));
  }
  req.user = payload;
  return (next());
};
