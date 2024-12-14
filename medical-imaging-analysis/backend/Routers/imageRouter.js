const express = require('express');
const imageController = require('./../Controllers/imageController');
const authController = require('./../Controllers/authController');
const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    imageController.scannedImage,
    imageController.uploadScanImage
  );

module.exports = router;
