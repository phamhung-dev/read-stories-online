const express = require("express");
const adminApi = express.Router();
const pictureBookApi = require("./PictureBookApi");
const authorApi = require("./AuthorApi");
const chapterApi = require("./ChapterApi");
const userApi = require("./UserApi");
const purchaseApi = require("./PurchaseApi");

adminApi.use("/picture-books", pictureBookApi);
adminApi.use("/chapters", chapterApi);
adminApi.use("/users", userApi);
adminApi.use("/purchases", purchaseApi);
adminApi.use("/authors", authorApi);

module.exports = adminApi;