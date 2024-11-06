const AppError = require('./../utils/AppError');

function developmentErrorHandler(err, req, res, next) {
  res.status(404).json({
    status: 'fail',
    error: err,
  });
}

function handleDublicateError(err) {
  const fieldName = Object.keys(err.keyValue)[0];
  const message = `Duplicate field value: '${err.keyValue[fieldName]}'. Please use a different value for '${fieldName}'.`;
  return new AppError(message, 400);
}

function handleValidationError(err) {
  return new AppError(err.message, 400);
}

function handleCastError(err) {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}

function productionErrorHandler(err, req, res, next) {
  if (err.code === 11000) err = handleDublicateError(err);

  if (err.name === 'ValidationError')
    err = handleValidationError(err);

  if (err.name === 'CastError') err = handleCastError(err);
  res.status(err.statusCode || 500).json({
    status: 'fail',
    message: err.message,
  });
}

exports.globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    productionErrorHandler(err, req, res, next);
  }
  if (process.env.NODE_ENV === 'development') {
    developmentErrorHandler(err, req, res, next);
  }
};
