const Post = require("../models/post");

/* GET all posts */
exports.posts_get = function (req, res, next) {
  res.send("GET all posts");
};

/* GET all published posts */
exports.published_posts_get = function (req, res, next) {
  res.send("GET all published posts");
};

/* GET specific post */
exports.post_get = function (req, res) {
  res.send("GET specific post: " + req.params.postId);
};

/* POST create post */
exports.post_post = function (req, res, next) {
  res.send("POST create post");
};

/* PUT update post */
exports.post_put = function (req, res, next) {
  res.send("PUT update post: " + req.params.postId);
};

/* PUT delete post */
exports.post_delete = function (req, res, next) {
  res.send("DELETE delete post: " + req.params.postId);
};
