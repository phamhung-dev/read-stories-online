const express = require("express");
const pictureBookApi = express.Router();
const pictureBookController = require("./../../src/controllers/PictureBookController");

pictureBookApi.get("/", pictureBookController.findAllPublished);
pictureBookApi.get("/recent-release", pictureBookController.findRecentRelease);
pictureBookApi.get("/new", pictureBookController.findNew);
pictureBookApi.get("/recent-updated", pictureBookController.findRecentUpdated);
pictureBookApi.get("/most-viewed", pictureBookController.findMostViewed);
pictureBookApi.get("/top-rated", pictureBookController.findTopRated);
pictureBookApi.get("/:slug", pictureBookController.findBySlug);
pictureBookApi.get("/:slug/chapters", pictureBookController.findAllChapters);
pictureBookApi.post("/:slugPictureBook/:slugChapter", pictureBookController.findPages);

module.exports = pictureBookApi;