const express = require("express");
const view = express.Router();
const webView = require("./web/WebView");
const adminView = require("./admin/AdminView");

view.use("/", webView);
view.use("/admin", adminView);

module.exports = view;