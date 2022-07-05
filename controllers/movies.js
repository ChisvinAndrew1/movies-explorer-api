const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const NotValidateData = require('../errors/NotValidateData');
const SomeError = require('../errors/SomeError');
const Movie = require('../models/movie');
const { errorsNotValidateData, errorsNotFoundError, errForbiddenError } = require('../utils/constants');

function getMovies(_, res, next) {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(() => next(new SomeError()));
}

function DeleteMovieById(req, res, next) {
  Movie.findById(
    req.params.movieId,
  )
    .orFail(() => next(new NotFoundError(errorsNotFoundError.errMovies)))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(errForbiddenError.errMovies));
      }
      return movie.remove()
        .then(() => res.send({ message: 'фильм удален' }));
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        return next(new NotValidateData(errorsNotValidateData.errDeleteMovies));
      }
      return next(new SomeError());
    });
}

function createMovie(req, res, next) {
  const {
    country, director, duration, year,
    description, image, trailerLink,
    thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotValidateData(errorsNotValidateData.errCreateMovies));
      }
      return next(new SomeError());
    });
}

module.exports = {
  getMovies,
  DeleteMovieById,
  createMovie,
};
