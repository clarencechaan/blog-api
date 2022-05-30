const Comment = require("../models/comment");
const Post = require("../models/comment");
const { body, validationResult } = require("express-validator");

/* GET all comments on post */
exports.post_comments_get = async function (req, res, next) {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.json({ error: err });
  }
};

/* POST create comment */
exports.comment_post = [
  body("name", "Name must be between 1 and 24 characters.")
    .trim()
    .isLength({ min: 1, max: 24 })
    .escape(),
  body("text", "Text must be between 1 and 1500 characters.")
    .trim()
    .isLength({ min: 1, max: 1500 })
    .escape(),
  async function (req, res, next) {
    const errors = validationResult(req);
    const { name, text } = req.body;
    const timestamp = Date.now();
    const comment = new Comment({
      name,
      text,
      timestamp,
      post: req.params.postId,
    });
    try {
      // throw error if errors exist
      if (!errors.isEmpty()) {
        throw errors.array();
      }

      // check that post exists
      await Post.findById(req.params.postId);

      // save comment
      res.json(await comment.save());
    } catch (err) {
      res.json({ error: err });
    }
  },
];
