const Post = require("../models/post");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

/* GET all posts */
exports.posts_get = async function (req, res, next) {
  try {
    const posts = await Post.find({}).populate(
      "author",
      "first_name last_name username"
    );
    res.json(posts);
  } catch (err) {
    res.json({ error: err.message || err });
  }
};

/* GET all published posts */
// ordered by date descending
exports.published_posts_get = async function (req, res) {
  try {
    const publishedPosts = await Post.find({ published: true })
      .populate("author", "first_name last_name username")
      .sort({ publish_date: -1 });
    res.json(publishedPosts);
  } catch (err) {
    res.json({ error: err.message || err });
  }
};

/* GET 4 latest published posts */
// ordered by date descending
exports.published_posts_latest_get = async function (req, res) {
  try {
    const publishedPosts = await Post.find({ published: true })
      .sort({ publish_date: -1 })
      .limit(4)
      .populate("author", "first_name last_name username");
    res.json(publishedPosts);
  } catch (err) {
    res.json({ error: err.message || err });
  }
};

/* GET specific post */
exports.post_get = async function (req, res) {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "author",
      "first_name last_name username"
    );
    res.json(post);
  } catch (err) {
    res.json({ error: err.message || err });
  }
};

/* POST create post */
exports.post_post = [
  // authenticate user's token
  passport.authenticate("jwt", { session: false }),
  // validate and sanitize
  body("author", "Author must be between 1 and 72 characters.")
    .trim()
    .isLength({ min: 1, max: 72 })
    .escape(),
  body("title", "Title must be between 1 and 72 characters.")
    .trim()
    .isLength({ min: 1, max: 72 })
    .escape(),
  body("body", "Body must be between 1 and 1500 characters.")
    .trim()
    .isLength({ min: 1, max: 1500 })
    .escape(),
  body("published", "Published must be a boolean value.").isBoolean(),
  async function (req, res, next) {
    const errors = validationResult(req);
    let { title, body, published } = req.body;
    const author = req.user._id;
    let publish_date;

    // set publish date if post is published
    if (published) {
      publish_date = Date.now();
    }
    try {
      // throw error if errors exist
      if (!errors.isEmpty()) {
        throw errors.array();
      }

      const post = new Post({ author, title, body, published, publish_date });
      res.json(await post.save());
    } catch (err) {
      res.json({ error: err.message || err });
    }
  },
];

/* PUT update post */
exports.post_put = [
  // authenticate user's token
  passport.authenticate("jwt", { session: false }),
  // validate and sanitize
  body("title", "Title must be between 1 and 72 characters.")
    .trim()
    .isLength({ min: 1, max: 72 })
    .escape(),
  body("body", "Body must be between 1 and 1500 characters.")
    .trim()
    .isLength({ min: 1, max: 1500 })
    .escape(),
  body("published", "Published must be a boolean value.").isBoolean(),
  async function (req, res, next) {
    const errors = validationResult(req);
    let { title, body, published } = req.body;
    try {
      const post = await Post.findById(req.params.postId);
      // throw error if post does not exist
      if (!post) {
        throw new Error("Post does not exist.");
      }

      const { author, published: prevPublished, publish_date } = post;
      // throw error if user does not match post's author
      if (req.user._id.toString() !== author.toString()) {
        throw "You don't have permission to edit this post.";
      }

      // set publish date if post becomes newly published
      if (!prevPublished && published) {
        publish_date = Date.now();
      }

      // throw error if errors exist
      if (!errors.isEmpty()) {
        errors.throw();
      }

      const updates = {
        title,
        body,
        published,
        publish_date,
      };
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        { $set: updates },
        {
          new: true,
        }
      );
      res.json(updatedPost);
    } catch (err) {
      res.json({ error: err.message || err });
    }
  },
];

/* DELETE delete post */
exports.post_delete = [
  // authenticate user's token
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const post = await Post.findById(req.params.postId);
      // throw error if post does not exist
      if (!post) {
        throw new Error("Post does not exist.");
      }

      // throw error if user does not match post's author
      if (req.user._id.toString() !== post.author.toString()) {
        throw new Error("You don't have permission to delete this post.");
      }
      const deleted = await Post.findByIdAndDelete(req.params.postId);
      res.json(deleted);
    } catch (err) {
      res.json({ error: err.message || err });
    }
  },
];
