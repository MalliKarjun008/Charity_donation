const AppError = require("./appError");

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue ? Object.values(err.keyValue)[0] : "unknown";
  const field = Object.keys(err.keyPattern)[0];

  const message = `Duplicate field (${field}): '${value}'. Please use another value!`; // Create descriptive error message
  return new AppError(message, 400);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const message = err.message;
  const newError = new AppError(message, 400);

  const keys = Object.keys(err.errors);
  const errors = keys.reduce((acc, key) => {
    acc[key] = err.errors[key].message;
    return acc;
  }, {});

  newError.name = "ValidationError";
  newError.errors = errors;
  return newError;
};

const sendErrorDev = (err, res, req) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err, // Full error object
    stack: err.stack, // Stack trace for debugging
  });
};

const sendErrorProd = (err, res, req) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational ? err.message : "Something went wrong", // Only show operational errors
    validationError: err.name === "ValidationError",
    errors: err.name === "ValidationError" ? err.errors : "",
  });
};

const globalErrorHandler = (err, req, res, next) => {
  // Set default values if not provided
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Development: Send verbose error information
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res, req);
    return;
  }

  // Production: Handle specific MongoDB errors
  if (err.code === 11000) err = handleDuplicateFieldsDB(err); // Duplicate key error
  if (err.name === "CastError") err = handleCastErrorDB(err); // Invalid ID format
  if (err.name === "ValidationError") err = handleValidationErrorDB(err); // Handle validation errors

  // Production: Send sanitized error response
  sendErrorProd(err, res, req);
};

module.exports = globalErrorHandler;
