const catchAsync = require('./../utils/catchAsync');
const Patient = require('./../Models/patientModel');
const handlerFactory = require('./handlerFactory')

const { body, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

exports.createPatient = catchAsync(async (req, res, next) => {
  console.log(req.file);

  // Validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new AppError(
        'Validation failed while saving patient details',
        400
      )
    );
  }

  // Prepare patient data (include the image path)
  const patientData = {
    name: req.body.name,
    dob: req.body.dob,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address,
    // Save the relative path for the image
    image: req.file ? `patientImg/${req.file.filename}` : null,
  };

  // Create the new patient record
  const newPatient = await Patient.create(patientData);

  res.status(201).json({
    status: 'success',
    data: {
      newPatient,
    },
  });
});

// Validation Middleware
exports.validatePatientData = [
  body('name').notEmpty().withMessage('Name is required'),
  body('dob').isDate().withMessage('Valid date of birth is required'),
  body('gender')
    .isIn(['male', 'female'])
    .withMessage('Gender must be male or female'),
  body('phone')
    .isMobilePhone()
    .withMessage('Valid phone number is required'),
  body('address').notEmpty().withMessage('Address is required'),
];

exports.getPatients = handlerFactory.getAll(Patient);
