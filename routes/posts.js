const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//homepage
router.get("/", ensureAuth, postController.getIndex);

//New Post
router.post("/createPost", postController.createPost);

// Delete Post
router.delete("/deletePost", postController.deletePost);

module.exports = router;
