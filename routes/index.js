const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

// POSTS

/* GET all posts */
router.get("/api/posts", post_controller.posts_get);

/* GET all published posts */
router.get("/api/posts/published", post_controller.published_posts_get);

/* GET 4 latest published posts */
router.get(
  "/api/posts/published/latest",
  post_controller.published_posts_latest_get
);

/* GET specific post */
router.get("/api/posts/:postId", post_controller.post_get);

/* POST create post */
router.post("/api/posts", post_controller.post_post);

/* PUT update post */
router.put("/api/posts/:postId", post_controller.post_put);

/* PUT delete post */
router.delete("/api/posts/:postId", post_controller.post_delete);

// COMMENTS

/* GET all comments on post */
router.get("/api/posts/:postId/comments", comment_controller.post_comments_get);

/* POST create comment */
router.post("/api/posts/:postId/comments", comment_controller.comment_post);

// USERS

/* POST create user */
router.post("/api/users", user_controller.user_post);

module.exports = router;
