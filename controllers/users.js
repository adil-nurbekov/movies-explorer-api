const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../errorHandler/ApiError');
const User = require('../models/user');
const {
  userErrorStatus,
  noDataErrorMessage,
  userExistErrorStatus,
  userExistErrorMessage,
  inputErrorMessage,
  invalidErrorMessage,
  forbiddenErrorStatus,
  authErrorStatus,
  forbiddenErrorMessage,
} = require('../utils/constants');

const { PRIVATE_KEY = 'privite-key' } = process.env;

// REGISTRATION//
const registration = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new ApiError(userErrorStatus, noDataErrorMessage);
  }
  User.findOne({ email })
    .then((regUser) => {
      if (regUser) {
        throw new ApiError(
          userExistErrorStatus,
          `${email} ${userExistErrorMessage}`
        );
      }
      return bcrypt.hash(password, 10).then((hash) => {
        User.create({
          email,
          password: hash,
          name,
        }).then((user) =>
          res.status(200).send({ email: user.email, name: user.name })
        );
      });
    })
    .catch(next);
};

// LOGIN IN//
const login = (req, res, next) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    throw new ApiError(userErrorStatus, inputErrorMessage);
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new ApiError(authErrorStatus, invalidErrorMessage);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new ApiError(authErrorStatus, invalidErrorMessage);
        }
        const token = jwt.sign({ id: user._id }, `${PRIVATE_KEY}`, {
          expiresIn: '7d',
        });
        return res.status(200).send({ token });
      });
    })
    .catch(next);
};

// GET USER
const getUser = (req, res, next) => {
  const userId = req.user.id;

  User.findById(userId)
    .then((user) =>
      res.status(200).send({ email: user.email, name: user.name })
    )
    .catch(next);
};

// UPDATE USER INFO
const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user.id;

  User.findByIdAndUpdate(
    userId,
    { email, name },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (user) {
        return res.status(200).send({ email: user.email, name: user.name });
      }
      throw new ApiError(forbiddenErrorStatus, userExistErrorMessage);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).send(forbiddenErrorMessage);
      }
      next();
    });
};

module.exports = {
  getUser,
  updateUser,
  registration,
  login,
};
