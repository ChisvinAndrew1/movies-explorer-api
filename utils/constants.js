// const regexUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
const CONFLICT_KEY_CODE = 11000;

const errorsNotValidateData = {
  errUser: 'Переданы некорректные данные при создании/обновлении профиля',
  errDeleteMovies: 'Переданы некорректные данные при удалении фильма',
  errCreateMovies: 'Переданы некорректные данные при создании фильма',
};

const errorsConflictError = {
  errUser: 'Пользователь с таким Email уже создан',
};

const errorsNotFoundError = {
  errUser: 'Пользователь не найден',
  errMovies: 'Такого фильма не существует',
};

const errForbiddenError = {
  errMovies: 'Нельзя удалять чужие фильмы',
};

module.exports = {
  CONFLICT_KEY_CODE,
  errorsNotValidateData,
  errorsConflictError,
  errorsNotFoundError,
  errForbiddenError,
};
