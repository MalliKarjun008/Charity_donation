const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user.services");
const userFactory = require("../factory/factory");
const User = require("./../models/user.model");
const ApiFeatures = require("../utils/api_features");

// get all the users
exports.getAllUsers = userFactory.getAllFactory(User);

exports.getAllFollowers = async (req, res, next) => {
  // get the current user
  const user_id = req.user._id;
  const user = User.findById(user_id);

  // use factory functions with applied filters
  const factory = userFactory.getAllFactory(User, {
    defaultFilter: { _id: { $in: user.followers } },
  });

  return factory;
};

exports.getUserById = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const user = await userService.getUserById(userId);
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;

  const user = await userService.getUserById(user_id);

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// following management

exports.getAllFollowedUsers = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;

  // 1. Get the current user with user_id
  const user = await User.findById(user_id);

  // 2. use factory with applied filters
  const factory = userFactory.getAllFactory(User, {
    defaultFilter: { _id: { $in: user.followings } },
  });

  return factory(req, res, next);
});

exports.handleFollowing = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const user = await User.findById(user_id);
  const isFollow = user.followings.includes(req.params.id);

  if (!isFollow) {
    this.startFollowing(req, res, next);
  } else {
    this.stopFollowing(req, res, next);
  }
});

exports.startFollowing = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const account_id = req.params.id;

  const { curUser, accountUser } = await userService.startsFollowing(
    user_id,
    account_id
  );

  res.status(200).json({
    status: "success",
    message: `You started following ${accountUser.username}`,
    data: curUser,
  });
});

exports.stopFollowing = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const account_id = req.params.id;

  const { curUser, accountUser } = await userService.stopFollowing(
    user_id,
    account_id
  );

  res.status(200).json({
    status: "success",
    message: `You stopped following ${accountUser.username}`,
    data: curUser,
  });
});

exports.getSuggestionsToFollow = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const limit = req.query.limit || 10;

  const suggestions = await userService.suggestToFollow(user_id, limit);

  res.status(200).json({
    status: "success",
    data: suggestions,
  });
});

// get all posts liked by user
exports.getAllLikedPosts = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;

  const factory = userFactory.getAllFactory(Post, {
    defaultFilter: { likes: user_id },
  });

  return factory;
});

exports.unsaveAllPosts = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;

  const user = await userService.unsaveAllPosts(user_id);

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// searching users
exports.searchUsers = catchAsync(async (req, res, next) => {
  const query = User.find().setOptions({ virtuals: false });

  const features = new ApiFeatures(query, req.query, ["username", "email"])
    .filter()
    .search()
    .limitFields()
    .paginate();

  //execute query and explicitly exclude virtuals
  const users = await features.query.lean({
    virtuals: false,
  });

  res.status(200).json({
    status: "success",
    length: users.length,
    data: users,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const data = req.body;
  const profilePic = req.files?.profilePicture?.[0];
  const coverPic = req.files?.coverPicture?.[0];

  const user = await userService.updateUser(
    user_id,
    data,
    profilePic,
    coverPic
  );

  res.status(200).json({
    status: "success",
    data: user,
    message: "user updated successfully",
  });
});
