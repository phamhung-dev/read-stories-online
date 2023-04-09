const express = require('express');
const userApi = express.Router();
const userController = require('./../../src/controllers/UserController');
const { fileUploader } = require("./../../config/CloudinaryConfig");

userApi.get("/", userController.findAll);
userApi.get("/:id", userController.show);
userApi.put("/:id/update", fileUploader.single('avatar'), userController.update);

module.exports = userApi;