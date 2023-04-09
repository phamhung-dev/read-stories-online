const express = require("express");
const adminApi = express.Router();
const pictureBookApi = require("./PictureBookApi");
const userApi = require("./UserApi");

adminApi.use("/picture-books", pictureBookApi);
adminApi.use("/users", userApi);

module.exports = adminApi;