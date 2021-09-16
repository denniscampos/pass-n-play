const Profile = require("../models/Profile");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const moment = require("moment");

module.exports = {
  editProfile: async (req, res) => {
    try {
      const socials = await Profile.find({ user: req.user.id });

      res.render("edit", {
        user: req.user,
        socials: socials,
      });
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  },
};
