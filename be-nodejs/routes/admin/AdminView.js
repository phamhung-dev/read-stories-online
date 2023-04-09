const express = require("express");
const adminView = express.Router();


adminView.get("/", (req, res) => {
    res.render("admin/index");
});

adminView.get("/chapter", (req, res) => {
    res.render("admin/chapter/index");
});



module.exports = adminView;