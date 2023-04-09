const express = require("express");
const commentApi = express.Router();
const commentController = require("./../../src/controllers/CommentController");

commentApi.get("/", commentController.findAll);
commentApi.post("/create", commentController.create);
commentApi.delete("/:id/destroy", commentController.destroy);

module.exports = commentApi;