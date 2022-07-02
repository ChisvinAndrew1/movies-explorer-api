const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { auth } = require('../midllewars/auth');
const { signinValidator, signoutValidator } = require('../midllewars/celebrateValidator');
const moviesRouter = require('./movies');
const userRouter = require('./users');

router.post('/signup', signoutValidator, createUser);

router.post('/signin', signinValidator, login);
router.use(auth);

router.get('/signout', (_req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.all('*', (_req, _res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
