const express = require("express");
const adminView = express.Router();


adminView.get("/", (req, res) => {
    res.render("admin/index");
});

adminView.get("/chapter", (req, res) => {
    res.render("admin/chapter/index");
});

adminView.get("/author", (req, res) => {
    res.render("admin/author/index");
});


module.exports = adminView;