const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const NotValidateData = require('../errors/NotValidateData');
const SomeError = require('../errors/SomeError');
const User = require('../models/user');
const { JWT_SECRET_DEV, SALT_ROUNDS } = require('../utils/config');
const { CONFLICT_KEY_CODE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

function createUser(req, res, next) {
  const {
    email, password, name,
  } = req.body;
  bcryptjs.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.send({
      email,
      name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotValidateData('Переданы некорректные данные при создании профиля'));
      } if (err.code === CONFLICT_KEY_CODE) {
        return next(new ConflictError('Пользователь с таким Email уже создан'));
      }
      return next(new SomeError());
    });
}

function updateProfile(req, res, next) {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    email,
    name,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ConflictError('Пользователь с таким Email уже создан'));
      } if (err.kind === 'ObjectId') {
        return next(new NotValidateData('Переданы некорректные данные при обновлении профиля'));
      }
      return next(new SomeError());
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const secret = NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV;
      const token = jsonwebtoken.sign({ _id: user._id }, secret, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch((err) => next(err));
}

function getMeInfo(req, res, next) {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => next(err));
}

module.exports = {
  createUser,
  updateProfile,
  login,
  getMeInfo,
};
