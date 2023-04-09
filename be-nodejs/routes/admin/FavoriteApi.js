const express = require("express");
const favoriteApi = express.Router();
const favoriteController = require("./../../src/controllers/FavoriteController");

favoriteApi.post("/create", favoriteController.create);
favoriteApi.delete("/:id/delete", favoriteController.destroy);

module.exports = favoriteApi;