const userRouter = require('express').Router();
const {
  getMeInfo, updateProfile,
} = require('../controllers/users');
const { patchUserValidator } = require('../midllewars/celebrateValidator');

userRouter.get('/me', getMeInfo);

userRouter.patch(
  '/me',
  patchUserValidator,
  updateProfile,
);
module.exports = userRouter;
