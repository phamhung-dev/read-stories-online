const express = require("express");
const adminApi = express.Router();
const pictureBookApi = require("./PictureBookApi");
const chapterApi = require("./ChapterApi");

adminApi.use("/picture-books", pictureBookApi);
adminApi.use("/chapters", chapterApi);

module.exports = adminApi;