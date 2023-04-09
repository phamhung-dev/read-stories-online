const express = require("express");
const adminApi = express.Router();
const pictureBookApi = require("./PictureBookApi");
const authorApi = require("./AuthorApi");


adminApi.use("/picture-books", pictureBookApi);
adminApi.use("/authors", authorApi);


module.exports = adminApi;