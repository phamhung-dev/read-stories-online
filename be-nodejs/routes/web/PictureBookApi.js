const express = require("express");
const pictureBookApi = express.Router();
const pictureBookController = require("./../../src/controllers/PictureBookController");

pictureBookApi.get("/", pictureBookController.findAllPublished);

module.exports = pictureBookApi;