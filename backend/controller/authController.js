const catchAsync = require("../utils/catchAsync");
const authServices = require("../services/auth.services");

exports.register = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const result = await authServices.register(userData);

  res.status(201).json({
    status: "success",
    token: result.token,
    user: result.user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const result = await authServices.login(userData);

  res.status(200).json({
    status: "success",
    token: result.token,
    user: result.user,
  });
});
