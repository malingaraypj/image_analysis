const multer = require('multer');
const express = require('express');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const authController = require('./../Controllers/authController');

const Router = express.Router();

// Multer configuration for storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/scannedImages');
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

//controller function for uploading image

const imageUpload = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('No file uploaded!', 400));
  }

  console.log(req.file);
  console.log(req.body);

  res.status(200).json({
    status: 'success',
    message: 'Image uploaded successfully',
    file: req.file.filename,
  });
});

// POST route to handle file uploads
Router.post(
  '/',
  authController.protect,
  upload.single('image'),
  imageUpload
);

module.exports = Router;
