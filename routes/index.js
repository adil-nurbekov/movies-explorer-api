const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const userRouter = require('./users');
const moviesRouter = require('./movies');
const ApiError = require('../errorHandler/ApiError');

const rateLimiter = require('../middlewares/rateLimiter');
const {
  notFoundErrorStatus,
  notFoundErrorMessage,
} = require('../utils/constants');
const { registration, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use(rateLimiter); // REQUEST LIMITER

// ROUTER FOR SIGN UP
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
      password: Joi.string().required().min(5),
    }),
  }),
  registration,
);

// ROUTER FOR SIGN IN
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(5),
    }),
  }),
  login,
);

router.use(auth); // AUTHORIZATION ROUTER

router.use('/', userRouter); // USERS ROUTER
router.use('/', moviesRouter); // MOVIES ROUTER

// PAGE NOT FOUND ROUTER
router.use('*', () => {
  throw new ApiError(notFoundErrorStatus, notFoundErrorMessage);
});

module.exports = router;
