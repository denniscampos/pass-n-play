const Profile = require("../models/Profile");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const moment = require("moment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const socials = await Profile.find({ user: req.user.id });
      const allPosts = await Post.find({ userId: req.user.id });
      const reviews = await Comment.find();
      const users = await User.find(req.userName);

      res.render("profile", {
        users: users,
        user: req.user,
        userName: req.user.userName,
        email: req.user.email,
        posts: allPosts,
        socials: socials,
        moment: moment,
        reviews: reviews,
      });
    } catch (err) {
      console.log("Something went wrong: ", err);
    }
  },

  updateSocials: async (req, res) => {
    try {
      let platforms = await Profile.findOne({ user: req.user });
      if (!platforms) {
        platforms = new Profile({ user: req.user });
      }

      platforms.twitter = req.body.twitter;
      platforms.twitch = req.body.twitch;
      platforms.discord = req.body.discord;
      platforms.instagram = req.body.instagram;
      platforms.youtube = req.body.youtube;
      platforms.url = req.body.url;

      await platforms.save();

      res.redirect("/profile");
      console.log("update successful");
    } catch (err) {
      console.log("Something went wrong: ", err);
    }
  },
};
