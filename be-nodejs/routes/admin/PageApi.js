const express = require("express"); 
const pageApi = express.Router();
const pageController = require("./../../src/controllers/PageController");
const {fileUploader} = require("./../../config/CloudinaryConfig");
pageApi.get("/", pageController.findAll);
pageApi.get("/:id", pageController.findById);
pageApi.get("/:chapterId/chapter", pageController.findByChapter);
pageApi.post("/create",fileUploader.single("image") , pageController.create);
pageApi.put("/:id/update", fileUploader.single("image") ,pageController.update);
pageApi.delete("/:id/destroy", pageController.destroy);
pageApi.get("/:id/show", pageController.show);

module.exports = pageApi;
