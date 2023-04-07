const express = require("express");
const api = express.Router();
const adminApi = require("./admin/AdminApi");
const webApi = require("./web/WebApi");

api.use("/admin", adminApi);
api.use("/", webApi);

module.exports = api;