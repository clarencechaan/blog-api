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
    res.json({ error: err });
  }
};

/* GET all published posts */
exports.published_posts_get = async function (req, res) {
  try {
    const publishedPosts = await Post.find({ published: true }).populate(
      "author",
      "first_name last_name username"
    );
    res.json(publishedPosts);
  } catch (err) {
    res.json({ error: err });
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
    res.json({ error: err });
  }
};

/* POST create post */
exports.post_post = [
  passport.authenticate("jwt", { session: false }),
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
    let { author, title, body, published } = req.body;
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

      // check that author exists
      await User.findById(author);
      const post = new Post({ author, title, body, published, publish_date });
      res.json(await post.save());
    } catch (err) {
      res.json({ error: err });
    }
  },
];

/* PUT update post */
exports.post_put = [
  passport.authenticate("jwt", { session: false }),
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
      // throw error if errors exist
      if (!errors.isEmpty()) {
        throw errors.array();
      }

      // set publish date if post becomes newly published
      let { published: prevPublished, publish_date } = await Post.findById(
        req.params.postId
      );
      if (!prevPublished && published) {
        publish_date = Date.now();
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
      res.json({ error: err });
    }
  },
];

/* DELETE delete post */
exports.post_delete = [
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const deleted = await Post.findByIdAndDelete(req.params.postId);
      res.json(deleted);
    } catch (err) {
      res.json({ error: err });
    }
  },
];
