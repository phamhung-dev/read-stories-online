const express = require("express");
const adminApi = express.Router();
const pictureBookApi = require("./PictureBookApi");

adminApi.use("/picture-books", pictureBookApi);

module.exports = adminApi;