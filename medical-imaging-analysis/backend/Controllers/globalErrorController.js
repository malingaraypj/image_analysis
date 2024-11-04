function developmentErrorHandler(err, req, res, next) {
  res.status(404).json({
    status: "fail",
    error: err,
  });
}

function productionErrorHandler(err, req, res, next) {
  res.status(404).json({
    status: "fail",
    message: err.message,
  });
}

exports.globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    productionErrorHandler(err, req, res, next);
  }
  if (process.env.NODE_ENV === "development") {
    developmentErrorHandler(err, req, res, next);
  }
};
