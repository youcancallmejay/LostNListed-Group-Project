const express = require("express");
const router = express.Router();

const PostController = require("../controllers/post.controller");
module.exports = (app) => {
  app.post("/api/posts", PostController.createPost);
  app.get("/api/posts", PostController.getAllPosts);
  app.get("/api/posts/:id", PostController.getPostById);
  app.get("api/posts/type/:type", PostController.getPostByType);
  app.put("/api/posts/:id", PostController.updatePost);
  app.delete("/api/posts/:id", PostController.deletePost);
};
