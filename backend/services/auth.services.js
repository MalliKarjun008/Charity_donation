const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/appError");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (userData) => {
  if (!userData || !userData.email || !userData.password) {
    throw new AppError("Please provide email and password");
  }

  //check if user already exists
  const existingUser = await User.find({ email: userData.email });
  if (existingUser.length > 0) {
    throw new AppError("User already exists", 400);
  }

  // create new user
  const user = await User.create({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    DOB: userData.DOB,
  });

  if (!user) throw new AppError("User creation failed");

  // generate jwt token
  const token = signToken(user._id);

  return {
    token,
    user,
  };
};

exports.login = async (userData) => {
  if (!userData || !userData.email || !userData.password) {
    throw new AppError("Please provide email and password");
  }

  // find user by email
  const user = await User.findOne({ email: userData.email }).select(
    "+password"
  );
  if (!user) throw new AppError("Invalid email or password", 401);

  // compare password
  const isMatch = await user.comparePassword(userData.password);

  if (!isMatch) throw new AppError("Invalid email or password", 401);

  // generate jwt token
  const token = signToken(user._id);

  return {
    token,
    user,
  };
};
