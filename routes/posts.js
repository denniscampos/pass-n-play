const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
// const postsController = require("../controller/posts")

module.exports = {
  createPost: async (req, res) => {
    try {
      await Post.create({
        postMessage: req.body.newPost,
        userId: req.user.id,
        userName: req.userName,
        likes: 0,
      });
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
};
