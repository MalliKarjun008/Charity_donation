const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next); // Catch errors and pass to Express
};

module.exports = catchAsync;
