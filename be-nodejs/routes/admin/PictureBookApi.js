const express = require("express");
const pictureBookApi = express.Router();
const pictureBookController = require("./../../src/controllers/PictureBookController");
const { fileUploader } = require("./../../config/CloudinaryConfig");

pictureBookApi.get("/", pictureBookController.findAll);
pictureBookApi.post("/create", fileUploader.single('avatar'), pictureBookController.create);
pictureBookApi.put("/:id/update", fileUploader.single('avatar'), pictureBookController.update);
pictureBookApi.get("/:id", pictureBookController.show);
pictureBookApi.delete("/:id/destroy", pictureBookController.destroy);

module.exports = pictureBookApi;