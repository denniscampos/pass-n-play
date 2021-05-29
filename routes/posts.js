const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//homepage
// router.get("/", ensureAuth, postController.getIndex);

// Profile Page NEED TO SET UP PROFILE
// router.get("/search", postController.getProfile);

//New Post
router.post("/createPost", postController.createPost);

//Get Post
router.get("/:id", ensureAuth, postController.getPost);

// Get Likes
router.put("/likePost/:id", postController.likePost);

// Delete Post
router.delete("/deletePost/:id", postController.deletePost);

module.exports = router;
