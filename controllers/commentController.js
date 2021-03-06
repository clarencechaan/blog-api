const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

/* GET all comments on a post */
/* order by timestamp desc*/
exports.post_comments_get = async function (req, res, next) {
  try {
    const comments = await Comment.find({ post: req.params.postId }).sort({
      timestamp: -1,
    });
    res.json(comments);
  } catch (err) {
    res.json({ error: err.message || err });
  }
};

/* POST create comment */
exports.comment_post = [
  body("name", "Name must be between 1 and 42 characters.")
    .trim()
    .isLength({ min: 1, max: 42 })
    .escape(),
  body("text", "Text must be between 1 and 1000 characters.")
    .trim()
    .isLength({ min: 1, max: 1000 })
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
      // check that post exists
      const post = await Post.findById(req.params.postId);
      if (!post) {
        throw new Error("Post does not exist.");
      }

      // throw error if errors exist
      if (!errors.isEmpty()) {
        throw errors.array();
      }

      // save comment
      res.json(await comment.save());
    } catch (err) {
      res.json({ error: err.message || err });
    }
  },
];
