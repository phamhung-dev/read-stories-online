const express = require("express");
const chapterApi = express.Router();
const chapterController = require("./../../src/controllers/ChapterController");

chapterApi.get("/", chapterController.findAll);
chapterApi.post("/create", chapterController.create);
chapterApi.get("/:id/show", chapterController.findById);

module.exports = chapterApi;