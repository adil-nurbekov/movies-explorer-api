const ApiError = require('../errorHandler/ApiError');
const Movie = require('../models/movie');
const {
  notFoundErrorStatus,
  notFoundErrorMessage,
  forbiddenErrorStatus,
  forbiddenErrorMessage,
} = require('../utils/constants');

// GET ALL SAVED MOVIES
const getMovies = (req, res, next) => {
  const userId = req.user.id;

  Movie.find({ owner: userId })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// ADD MOVIE TO SAVED
const addMovie = (req, res, next) => {
  Movie.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailer: req.body.trailer,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
    owner: req.user.id,
  })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch(next);
};

// REMOVE MOVIE FROM SAVED
const removeMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(new ApiError(notFoundErrorStatus, notFoundErrorMessage))
    .then((movie) => {
      if (req.user.id === movie.owner.toString()) {
        return Movie.deleteOne({ _id: movie._id }).then(() => res.status(200).send('movie has been removed'));
      }
      throw new ApiError(forbiddenErrorStatus, forbiddenErrorMessage);
    })
    .catch(next);
};

module.exports = { getMovies, addMovie, removeMovie };
