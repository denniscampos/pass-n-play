const axios = require("axios").default;
const Post = require("../models/Post");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const allPosts = await Post.find();

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
        // likes: 0,
      });

      console.log("post was created");
      res.redirect("/homepage");
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      await Post.findOneAndDelete({ _id: req.body.postIdFromJSFile });
      console.log("Deleted Post");
      res.json("Deleted Post");
    } catch (err) {
      console.log(err);
    }
  },
};
