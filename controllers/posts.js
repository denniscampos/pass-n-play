const axios = require("axios").default;
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const allPosts = await Post.find({ userId: req.user.id });

      res.render("profile.ejs", {
        user: req.user,
        userName: req.user.userName,
        email: req.user.email,
        posts: allPosts,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getIndex: async (req, res) => {
    try {
      const allPosts = await Post.find({ user: req.user.id });

      res.render("/homepage.ejs", {
        userName: req.user.userName,
        email: req.user.email,
        posts: allPosts,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      await Post.create({
        postMessage: req.body.newPost,
        userId: req.user.id,
        userName: req.user.userName,
        // image: null,
        likes: 0,
      });
      console.log("post was created");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate({ _id: req.params.id });
      console.log("Likes +1");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      // Find post by id
      let posts = await Post.findById({ _id: req.params.id });
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
};
