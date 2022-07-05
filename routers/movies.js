const moviesRouter = require('express').Router();
const {
  getMovies, createMovie, DeleteMovieById,
} = require('../controllers/movies');
const { postMoviesValidator, deleteMoviesValidator } = require('../midllewars/celebrateValidator');

moviesRouter.get('/', getMovies);

moviesRouter.delete(
  '/:movieId',
  deleteMoviesValidator,
  DeleteMovieById,
);

moviesRouter.post(
  '/',
  postMoviesValidator,
  createMovie,
);

module.exports = moviesRouter;
