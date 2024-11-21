const express = require('express');
const authController = require('./../Controllers/authController');
const userController = require('./../Controllers/userController');

const Router = express.Router();

Router.route('/signup').post(authController.signup);
Router.route('/login').post(authController.login);

Router.route('/getusers').get(
  authController.protect,
  userController.getAllUsers
);
Router.route('/getUser/:id').get(userController.getUser);

Router.route('/deleteUser/:id').delete(
  authController.protect,
  authController.restrictTo('admin'),
  userController.deleteUser
);
Router.route('/updateUser/:id').patch(
  authController.protect,
  authController.restrictTo('admin'),
  userController.updateUser
);

Router.route('/updateMe').patch(
  authController.protect,
  userController.uploadUserPhoto,
  userController.updateMe
);

Router.route('/deleteMe').delete(
  authController.protect,
  userController.deleteMe
);
module.exports = Router;
