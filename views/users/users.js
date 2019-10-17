/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const userRouter = require('express').Router();
const userController = require('../../controllers/userController');

userRouter.param('id', userController.params);

userRouter.route('/users')
  .get(userController.get)
  .post(userController.post);

userRouter.route('/users/:id')
  .get(userController.getOne)
  .delete(userController.delete)
  .put(userController.put);

module.exports = userRouter;
