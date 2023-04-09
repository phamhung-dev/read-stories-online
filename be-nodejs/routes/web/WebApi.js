const express = require("express");
const webApi = express.Router();
const pictureBookApi = require("./PictureBookApi");
const userApi = require("./UserApi");

webApi.use("/picture-books", pictureBookApi);
webApi.use("/user", userApi);

module.exports = webApi;