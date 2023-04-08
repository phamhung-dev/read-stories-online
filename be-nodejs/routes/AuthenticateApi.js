const express = require("express");
const authenticateApi = express.Router();
const userController = require("./../src/controllers/UserController");
const verifyToken = require("./../src/middlewares/Authenticate");

authenticateApi.post("/login", userController.login);
authenticateApi.post("/register", userController.register);
authenticateApi.post("/logout", verifyToken, userController.logout);

module.exports = authenticateApi;