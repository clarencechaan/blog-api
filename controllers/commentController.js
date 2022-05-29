const Comment = require("../models/comment");

/* GET all comments on post */
exports.post_comments_get = function (req, res, next) {
  res.send("GET all comments on post: " + req.params.postId);
};

/* POST create comment */
exports.comment_post = function (req, res, next) {
  res.send("POST create comment on post: " + req.params.postId);
};
