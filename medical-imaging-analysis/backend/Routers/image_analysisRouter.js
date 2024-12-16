const multer = require('multer');
const express = require('express');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const Image = require('./../Models/ImageModel');

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

// Controller function for uploading image and predicting class
const imageUpload = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('No file uploaded!', 400));
  }

  // Path to the uploaded image
  const filePath = req.file.path;

  try {
    // Prepare FormData to send to the Python backend
    const formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));

    // console.log(req.file.filename);
    // console.log(req.body);

    // Send the image to the Python backend
    const response = await axios.post(
      'http://localhost:5000/predict',
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    // Get the predicted class from the Python backend response
    const { predicted_class, confidence } = response.data;

    const newImg = await Image.create({
      user: req.body.userId,
      image: req.file.filename,
      alzheimerClass: predicted_class,
    });

    // Return the prediction result
    res.status(200).json({
      status: 'success',
      predictedClass: predicted_class,
      confidence,
      message: `image stored as ${newImg}`,
    });
  } catch (err) {
    console.error(
      'Error in predicting image class:',
      err.response?.data || err.message
    );
    return next(new AppError('Error predicting image class', 500));
  }
});

// POST route to handle file uploads
Router.post('/', upload.single('image'), imageUpload);

module.exports = Router;
