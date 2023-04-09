const express = require("express");
const webApi = express.Router();
const pictureBookApi = require("./PictureBookApi");
const userApi = require("./UserApi");
const purchaseApi = require("./PurchaseApi");

webApi.use("/picture-books", pictureBookApi);
webApi.use("/user", userApi);
webApi.use("/purchases", purchaseApi);

module.exports = webApi;