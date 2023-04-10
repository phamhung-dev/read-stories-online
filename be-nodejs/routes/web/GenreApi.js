const express = require("express");
const genreApi = express.Router();
const genreController = require("./../../src/controllers/GenreController");
const pictureBookController = require("./../../src/controllers/PictureBookController");

genreApi.get("/", genreController.findAllPublished);
genreApi.get("/:slug", pictureBookController.findByGenre);

module.exports = genreApi;