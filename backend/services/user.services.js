const User = require("../models/user.model");
const Post = require("../models/post.model");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

exports.getUserById = async (userId) => {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

//   Follow Management
exports.startsFollowing = async (user_id, account_id) => {
  if (!account_id) throw new AppError("Provide the account id to follow", 400);
  if (user_id.toString() === account_id.toString())
    throw new AppError("You cannot follow yourself", 400);

  // check if the user is already following the account
  const user = await User.findById(user_id);

  if (user.followings.includes(account_id)) {
    throw new AppError("You are already following this account", 400);
  }

  // Update both users
  const curUser = await User.findByIdAndUpdate(
    user_id,
    { $addToSet: { followings: account_id } },
    { new: true, runValidators: true }
  );

  const accountUser = await User.findByIdAndUpdate(
    account_id,
    { $addToSet: { followers: user_id } },
    { new: true, runValidators: true }
  );

  return { curUser, accountUser };
};

exports.stopFollowing = async (user_id, account_id) => {
  if (!account_id)
    throw new AppError("Provide the account id to unfollow", 400);
  if (user_id.toString() === account_id.toString())
    throw new AppError("You cannot follow or unfollow yourself", 400);

  // check if the user is not following the account
  const user = await User.findById(user_id);

  if (!user.followings.includes(account_id)) {
    throw new AppError("You are not following this account", 400);
  }

  // update both users
  const curUser = await User.findByIdAndUpdate(
    user_id,
    {
      $pull: { followings: account_id },
    },
    { new: true, runValidators: true }
  );

  const accountUser = await User.findByIdAndUpdate(
    account_id,
    {
      $pull: { followers: user_id },
    },
    { new: true, runValidators: true }
  );

  return { curUser, accountUser };
};

// suggest loggedIn user to follow other users
exports.suggestToFollow = async (user_id, limit) => {
  if (!user_id) throw new AppError("please provide userId");

  limit = parseInt(limit);

  // 1. Get the logged in user's followings list
  const me = await User.findById(user_id).select("followings");
  if (!me) throw new AppError("User not found", 404);

  const myFollowings = me.followings || [];

  // aggregate suggestions
  const suggestions = User.aggregate([
    { $match: { _id: { $in: myFollowings } } }, // only considering the people user follow
    { $unwind: "$followings" }, // unwind the following
    {
      $group: {
        _id: "$followings",
        count: { $sum: 1 }, // counts how many mutuals follow them
      },
    },
    {
      $match: {
        _id: { $nin: [...myFollowings, user_id] }, // exclude user and others whom he already follow
      },
    },
    { $sort: { count: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        username: "$user.username",
        mutualCount: "$count",
      },
    },
  ]);

  return suggestions;
};

exports.unsaveAllPosts = async (user_id) => {
  if (!user_id) throw new AppError("please provide userid", 400);

  // check if user exists
  const user = await User.findById(user_id).select("savedPosts");

  if (user.savedPosts?.length == 0) {
    return user;
  }

  // extract post ids from savedPosts array
  const postIds = user.savedPosts.map((item) => item.post_id);

  // Remove user from all saved posts
  await Post.updateMany(
    { _id: { $in: postIds } },
    { $pull: { savedBy: user_id } }
  );

  // clear user's saved posts array
  const updatedUser = await User.findByIdAndUpdate(
    user_id,
    { $set: { savedPosts: [] } },
    { new: true, runValidators: true }
  );

  return updatedUser;
};

exports.updateUser = async (user_id, data, profilePic, coverPic) => {
  const { username, email, DOB, bio, location, website } = data;

  if (!user_id) throw new AppError("please provide userId", 400);

  // Create update object with basic fields
  const updateData = {
    username,
    email,
    DOB,
    bio,
    location,
    website,
  };

  // Only add profile/cover pictures if new files were uploaded
  if (profilePic) {
    updateData.profilePicture = profilePic.path;
  }
  if (coverPic) {
    updateData.coverPicture = coverPic.path;
  }

  // Remove undefined fields
  Object.keys(updateData).forEach(
    (key) => updateData[key] === undefined && delete updateData[key]
  );

  // Update user with new data
  const user = await User.findByIdAndUpdate(user_id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
