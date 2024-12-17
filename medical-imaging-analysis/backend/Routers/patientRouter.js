const express = require('express');
const patientController = require('./../Controllers/patientController');
const multer = require('multer');
const AppError = require('./../utils/AppError');
const Router = express.Router();

const authController = require('./../Controllers/authController');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/patientImg');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const userId = req.user ? req.user.id : 'anonymous';
    cb(null, `user-${userId}-${Date.now()}.${ext}`);
  },
});

// Multer filter for file type validation
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Not an accepted file type! Please upload an image.',
        400
      ),
      false
    );
  }
};

// Multer upload configuration
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

Router.route('/')
  .post(upload.single('image'), patientController.createPatient)
  .get(
    authController.protect,
    authController.restrictTo('doctor'),
    patientController.getPatients
  );

Router.route('/searchPatients').get(patientController.searchPatients);

Router.route('/:id').get(patientController.getPatient);

module.exports = Router;
