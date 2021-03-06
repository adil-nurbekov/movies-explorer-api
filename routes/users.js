const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

// ROUTER TO GET USER
router.get('/users/me', getUser);

// ROUTER TO CHANGE USERS INFO
router.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

module.exports = router;
