const express = require("express");
const webApi = express.Router();
const pictureBookApi = require("./PictureBookApi");
const userApi = require("./UserApi");
const purchaseApi = require("./PurchaseApi");
const historyApi = require("./HistoryApi");

webApi.use("/picture-books", pictureBookApi);
webApi.use("/user", userApi);
webApi.use("/purchases", purchaseApi);
webApi.use("/histories", historyApi);

module.exports = webApi;