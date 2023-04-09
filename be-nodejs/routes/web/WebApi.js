const express = require("express");
const webApi = express.Router();
const pictureBookApi = require("./PictureBookApi");
const userApi = require("./UserApi");
const purchaseApi = require("./PurchaseApi");
const commentApi = require("./CommentApi");

webApi.use("/picture-books", pictureBookApi);
webApi.use("/user", userApi);
webApi.use("/purchases", purchaseApi);
webApi.use("/comments", commentApi);

module.exports = webApi;