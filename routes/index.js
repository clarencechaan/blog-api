const express = require("express");
const router = express.Router();
const User = require("../models/user");

/* GET all posts */
router.get("/api/posts", function (req, res, next) {
  res.send("GET all posts");
});

/* GET specific post */
router.get("/api/posts/:postId", function (req, res, next) {
  res.send("GET specific post: " + req.params.postId);
});

/* POST create post */
router.post("/api/posts", function (req, res, next) {
  res.send("POST create post");
});

/* PUT update post */
router.put("/api/posts/:postId", function (req, res, next) {
  res.send("PUT update post: " + req.params.postId);
});

/* GET all comments on post */
router.get("/api/posts/:postId/comments", function (req, res, next) {
  res.send("GET all comments on post: " + req.params.postId);
});

/* POST create comment */
router.post("/api/posts/:postId/comments", function (req, res, next) {
  res.send("POST create comment on post: " + req.params.postId);
});

module.exports = router;
