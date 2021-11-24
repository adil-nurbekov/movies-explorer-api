const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, addMovie, removeMovie } = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, addMovie);
router.delete(
  '/movies/:movieId',
  auth,
  celebrate({
    params: Joi.object().keys({ movieId: Joi.string().length(24).hex() }),
  }),
  removeMovie,
);

module.exports = router;
