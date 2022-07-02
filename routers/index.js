const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { auth } = require('../midllewars/auth');
const { signinValidator, signoutValidator } = require('../midllewars/celebrateValidator');
const moviesRouter = require('./movies');
const userRouter = require('./users');

router.post('/signup', signoutValidator, createUser);

router.post('/signin', signinValidator, login);

router.get('/signout', (_req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);

module.exports = router;
