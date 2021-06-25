const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//New Post
router.post("/createPost", postController.createPost);

// Get Likes
router.put("/likePost/:id", postController.likePost);

// Delete Post
router.delete("/deletePost/:id", postController.deletePost);

module.exports = router;
