const jwt = require('jsonwebtoken');
const ApiError = require('../errorHandler/ApiError');

const { PRIVATE_KEY = 'privite-key' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'need an authorization' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, `${PRIVATE_KEY}`);
  } catch (err) {
    throw ApiError.userError('authorizaion needed');
  }
  req.user = payload;
  next();
};

module.exports = auth;
