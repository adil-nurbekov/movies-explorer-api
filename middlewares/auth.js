const jwt = require('jsonwebtoken');
const ApiError = require('../errorHandler/ApiError');
const { authErrorStatus, authErrorMessage } = require('../utils/constants');

const { PRIVATE_KEY = 'privite-key' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ApiError(authErrorStatus, authErrorMessage);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, `${PRIVATE_KEY}`);
  } catch (err) {
    throw new ApiError(authErrorStatus, authErrorMessage);
  }
  req.user = payload;
  next();
};

module.exports = auth;
