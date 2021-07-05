const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//New Post
router.post("/createPost", ensureAuth, postController.createPost);

// Get Likes
router.put("/likePost/:id", ensureAuth, postController.likePost);

// Delete Post
router.delete("/deletePost/:id", ensureAuth, postController.deletePost);

module.exports = router;
