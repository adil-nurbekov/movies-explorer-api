const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { getMovies, addMovie, removeMovie } = require('../controllers/movies');
const ApiError = require('../errorHandler/ApiError');
const auth = require('../middlewares/auth');
const { userErrorStatus, notUrlErrorMessage } = require('../utils/constants');

// METHOD TO CHECK URL
const isUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new ApiError(userErrorStatus, notUrlErrorMessage);
};

// ROUTER TO GET SAVED MOVIES
router.get('/movies', getMovies);

// ROUTER TO ADD NEW MOVIE
router.post(
  '/movies',
  auth,
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(isUrl),
      trailer: Joi.string().required().custom(isUrl),
      thumbnail: Joi.string().required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addMovie,
);

// ROUTER TO REMOVE MOVIE FROM SAVED
router.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({ movieId: Joi.string().length(24).hex() }),
  }),
  removeMovie,
);

module.exports = router;
