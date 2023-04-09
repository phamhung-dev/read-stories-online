const express = require("express");
const authorApi = express.Router();
const authorController = require("./../../src/controllers/AuthorController");

authorApi.get("/", authorController.findAll);
authorApi.get("/:slug", authorController.findBySlug);
authorApi.post("/create", authorController.create);
authorApi.put("/:id/update", authorController.update);


module.exports = authorApi;