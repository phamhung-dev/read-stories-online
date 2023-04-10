const express = require("express");
const chapterApi = express.Router();
const chapterController = require("./../../src/controllers/ChapterController");

chapterApi.get("/", chapterController.findAll);
chapterApi.get("/picture-books", chapterController.findAllPictureBook);
chapterApi.post("/create", chapterController.create);
chapterApi.get("/:id/show", chapterController.findById);
chapterApi.put("/:id/update", chapterController.update);

module.exports = chapterApi;