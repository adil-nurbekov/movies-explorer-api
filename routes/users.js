const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateUser,
  registration,
  login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

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
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
      password: Joi.string().required().min(5),
    }),
  }),
  login,
);
router.get('/users/me', auth, getUser);
router.patch('/users/me', auth, updateUser);

module.exports = router;
