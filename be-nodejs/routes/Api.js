const express = require("express");
const api = express.Router();
const adminApi = require("./admin/AdminApi");
const webApi = require("./web/WebApi");
const authenticateApi = require("./AuthenticateApi");

api.use("/admin", adminApi);
api.use("/", webApi);
api.use("/authenticate", authenticateApi);
module.exports = api;