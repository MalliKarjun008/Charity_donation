const express = require("express");
const userController = require("../controllers/user.controller");
const protect = require("../middleware/auth.middleware");
const upload = require("../services/upload.services");

const Router = express.Router();

// User routes
Router.use(protect);
Router.get("/", userController.getAllUsers);
Router.get("/followedUsers", userController.getAllFollowedUsers);
Router.get("/followers", userController.getAllFollowers);
Router.get("/getMe", userController.getMe);
Router.get("/searchUsers", userController.searchUsers);
Router.get("/getUser/:userId", userController.getUserById);

// updations
Router.patch(
  "/updateUser",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPicture", maxCount: 1 },
  ]),
  userController.updateUser
);

// Follow management
Router.patch("/startFollowing/:id", userController.startFollowing);
Router.patch("/stopFollowing/:id", userController.stopFollowing);
Router.patch("/handleFollow/:id", userController.handleFollowing);
Router.get("/suggestionToFollow", userController.getSuggestionsToFollow);

// user interactions
Router.patch("/unsaveAllPosts", userController.unsaveAllPosts);

module.exports = Router;
