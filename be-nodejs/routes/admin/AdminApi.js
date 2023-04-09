const express = require("express");
const adminApi = express.Router();
const pictureBookApi = require("./PictureBookApi");
const userApi = require("./UserApi");
const pageApi = require("./PageApi");


adminApi.use("/picture-books", pictureBookApi);
adminApi.use("/users", userApi);
adminApi.use("/page", pageApi);


module.exports = adminApi;