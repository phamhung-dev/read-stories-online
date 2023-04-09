const express = require("express");
const genreApi = express.Router();
const genreController = require("./../../src/controllers/GenreController");

genreApi.get("/", genreController.findAll);
genreApi.get("/:id/show", genreController.findById);
genreApi.post("/create", genreController.create);
genreApi.put("/:id/update", genreController.update);

module.exports = genreApi;