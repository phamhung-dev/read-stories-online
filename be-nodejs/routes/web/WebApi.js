const express = require("express");
const webApi = express.Router();
const pictureBookApi = require("./PictureBookApi");

webApi.use("/picture-books", pictureBookApi);

module.exports = webApi;