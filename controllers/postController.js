const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");

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
exports.post_post = async function (req, res, next) {
  let { author, title, body, published } = req.body;
  // set publish date if post is published
  if (published) {
    const publish_date = Date.now();
    return;
  }
  try {
    await User.findById(author);
    const post = new Post({ author, title, body, published, publish_date });
    res.json(await post.save());
  } catch (err) {
    res.json({ error: err });
  }
};

/* PUT update post */
exports.post_put = async function (req, res, next) {
  let { author, title, body, published } = req.body;
  try {
    // set publish date if post becomes newly published
    let { published: prevPublished, publish_date } = await Post.findById(
      req.params.postId
    );
    if (!prevPublished && published) {
      publish_date = Date.now();
    }
    const post = new Post({
      author,
      title,
      body,
      published,
      publish_date,
      _id: req.params.postId,
    });
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (err) {
    res.json({ error: err });
  }
};

/* DELETE delete post */
exports.post_delete = async function (req, res, next) {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.postId);
    res.json(deleted);
  } catch (err) {
    res.json({ error: err });
  }
};
