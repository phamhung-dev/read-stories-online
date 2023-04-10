const express = require("express");
const adminView = express.Router();


adminView.get("/", (req, res) => {
    res.render("admin/index");
});

adminView.get("/chapter", (req, res) => {
    res.render("admin/chapter/index");
});

adminView.get("/page", (req, res) => {
    res.render("admin/page/index");
});

adminView.get("/role", (req, res) => {
    res.render("admin/role/index");
});



module.exports = adminView;