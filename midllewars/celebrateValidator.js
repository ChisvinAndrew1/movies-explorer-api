const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('../utils/constants');

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signoutValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const patchUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required()
      .pattern(regexUrl),
    name: Joi.string().min(2).max(30),
  }),
});

const deleteMoviesValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required(),
  }),
});

const postMoviesValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .pattern(regexUrl),
    trailerLink: Joi.string()
      .required()
      .pattern(regexUrl),
    thumbnail: Joi.string()
      .required()
      .pattern(regexUrl),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  signinValidator,
  signoutValidator,
  patchUserValidator,
  deleteMoviesValidator,
  postMoviesValidator,
};
