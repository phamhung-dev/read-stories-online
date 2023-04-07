const express = require("express");
const pictureBookApi = express.Router();
const pictureBookController = require("./../../src/controllers/PictureBookController");

pictureBookApi.get("/", pictureBookController.findAll);
pictureBookApi.post("/create", pictureBookController.create);

module.exports = pictureBookApi;