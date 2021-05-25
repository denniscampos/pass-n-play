const axios = require("axios").default;
const Post = require("../models/Post");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getHomepage: async (req, res) => {
    try {
      // finds user and can be rendered on EJS.
      const users = await Post.find({ user: req.user.id });
      res.render("homepage", {
        user: req.user,
      });
      // console.log(gameAPI.data.results[0].name);
    } catch (error) {
      console.log(error);
    }
  },
};
