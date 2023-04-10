const express = require("express");
const userApi = express.Router();
const userController = require("./../../src/controllers/UserController");
const { fileUploader } = require("./../../config/CloudinaryConfig");
const authenticate = require("./../../src/middlewares/Authenticate");

userApi.get("/profile", authenticate, userController.showProfile);
userApi.put("/update-profile", [authenticate, fileUploader.single("avatar")], userController.updateProfile);

module.exports = userApi;