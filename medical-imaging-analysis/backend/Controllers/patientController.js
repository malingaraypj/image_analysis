const catchAsync = require('./../utils/catchAsync');
const Patient = require('./../Models/patientModel');
const handlerFactory = require('./handlerFactory');

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

exports.getPatient = catchAsync(async (req, res, next) => {
  const doc = await Patient.findById(req.params.id).populate({
    path: 'scannedImg',
    options: { sort: { createdAt: -1 } },
  });

  if (!doc) {
    return next(new AppError('No patient found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

// exports.searchPatients = catchAsync(async (req, res, next) => {
//   let { query } = req.query;

//   if (typeof query !== 'string') {
//     query = '';
//   }

//   // Trim whitespace from the query
//   query = query.trim();

//   if (!query) {
//     return res.status(400).json({
//       success: false,
//       message: 'Search query cannot be empty.',
//     });
//   }

//   const patients = await Patient.find({
//     $or: [
//       { name: { $regex: query, $options: 'i' } },
//       { phone: { $regex: query, $options: 'i' } },
//     ],
//   });
//   res.status(200).json({
//     success: true,
//     data: patients,
//   });
// });
