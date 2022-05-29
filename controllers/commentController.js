const Comment = require("../models/comment");
const Post = require("../models/comment");

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
exports.comment_post = async function (req, res, next) {
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
    await Post.findById(req.params.postId);

    // save comment
    res.json(await comment.save());
  } catch (err) {
    res.json({ error: err });
  }
};
