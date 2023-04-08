const express = require("express");
const adminApi = express.Router();
const pictureBookApi = require("./PictureBookApi");
const genreApi = require("./GenreApi");

adminApi.use("/picture-books", pictureBookApi);
adminApi.use("/genres", genreApi);

module.exports = adminApi;