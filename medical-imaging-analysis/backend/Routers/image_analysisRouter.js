const multer = require('multer');
const express = require('express');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const Image = require('./../Models/ImageModel');

const Router = express.Router();

// Flask server URL
const FLASK_SERVER_URL = 'http://127.0.0.1:5000/predict';

// Create upload directory if it doesn't exist
// const uploadDir = path.join(
//   __dirname,
//   '..',
//   'public',
//   'scannedImages'
// );
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// Multer configuration
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Multer destination called');
    console.log('File:', file);
    cb(null, 'public/scannedImages');
  },
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split('/')[1];
    const userId = req.user ? req.user.id : 'anonymous';
    cb(null, `user-${userId}-${Date.now()}.${ext}`);
  },
});

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

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Image upload handler
const imageUpload = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('No file uploaded!', 400));
  }

  const filePath = req.file.path;
  console.log('File upload path:', filePath);

  // Verify file was saved
  if (!fs.existsSync(filePath)) {
    return next(new AppError('File not saved correctly', 500));
  }

  try {
    // Prepare form data for Flask server
    const formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));

    const response = await axios.post(FLASK_SERVER_URL, formData, {
      headers: formData.getHeaders(),
    });

    const { predicted_class, confidence } = response.data;

    const newImg = await Image.create({
      user: req.body.userId || 'anonymous',
      image: req.file.filename,
      alzheimerClass: predicted_class,
    });

    res.status(200).json({
      status: 'success',
      predictedClass: predicted_class,
      confidence,
      message: `Image stored successfully.`,
      imageId: newImg.id,
    });
  } catch (err) {
    console.error(
      'Error in predicting image class:',
      err.response?.data || err.message
    );

    // Only delete the file if we're not going to store it
    if (fs.existsSync(filePath) && err) {
      fs.unlinkSync(filePath);
    }

    return next(new AppError('Error predicting image class', 500));
  }
});

// Define the POST route
Router.post(
  '/',
  (req, res, next) => {
    console.log('Request received');
    console.log('Headers:', req.headers);
    console.log('Files:', req.file);
    console.log('Body:', req.body);
    next();
  },
  upload.single('image'),
  imageUpload
);

module.exports = Router;
