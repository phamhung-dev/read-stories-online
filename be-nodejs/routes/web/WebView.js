const express = require("express");
const webView = express.Router();

const axios = require('axios');
const Tesseract = require('tesseract.js');

webView.get("/", (req, res) => {
    const imageUrl = 'https://res.cloudinary.com/de1ru7zhx/image/upload/v1681144877/6_rao0xc.jpg';
    axios({
    method: 'get',
    url: imageUrl,
    responseType: 'arraybuffer'
    })
    .then(response => {
        const buffer = Buffer.from(response.data, 'binary');
        Tesseract.recognize(buffer)
        .then(result => {
          console.log(result.data.text);
        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(err => {
        console.error(err);
    });


    res.render("web/index");
});

webView.get("/blog", (req, res) => {
    res.render("web/blog");
});

webView.get("/genres/:slug", (req, res) => {
    res.render("web/picture-books");
});

webView.get("/genres", (req, res) => {
    res.render("web/genres");
});

webView.get("/picture-books/:slug", (req, res) => {
    res.render("web/single-picture-book");
});

webView.get("/picture-books/:slugPictureBook/:slugChapter", (req, res) => {
    res.render("web/pages");
});

webView.get("/register", (req, res) => {
    res.render("web/register");
});

webView.get("/forgot-password", (req, res) => {
    res.render("web/forgot-password");
});

webView.get("/user/profile", (req, res) => {
    res.render("web/profile");
});

module.exports = webView;