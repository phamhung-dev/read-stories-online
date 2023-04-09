const express = require("express");
const userApi = express.Router();
const userController = require("./../../src/controllers/UserController");
const { fileUploader } = require("./../../config/CloudinaryConfig");

userApi.get("/:id", userController.showProfile);
userApi.put("/:id/update", fileUploader.single("avatar"), userController.updateProfile);

module.exports = userApi;