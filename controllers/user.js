const User = require("../models/User");
const flash = require("express-flash");
const moment = require("moment");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find(req.userName);

      res.render("users", {
        users: users,
        email: req.user.email,
        moment: moment,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // follow a user
  getFollowers: async (req, res) => {
    if (req.user.id !== req.params.id) {
      try {
        const users = await User.findById(req.params.id); //req.userName works
        const currentUser = await User.findById(req.user.id);

        // console.log(currentUser);
        if (!users.followers.includes(req.user.id)) {
          await users.updateOne({ $push: { followers: req.user.id } });
          await currentUser.updateOne({ $push: { following: req.params.id } });

          req.flash(
            "info",
            `You are now following ${users.userName.toUpperCase()}`
          );
          res.redirect("/users");
        } else {
          req.flash(
            "already",
            `You are already following ${users.userName.toUpperCase()}`
          );
          res.redirect("/users");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      req.flash(
        "cannot",
        `Wouldn't you LOVE to follow yourself, unfortunately you cannot`
      );
      res.redirect("/users");
    }
  },

  getUnfollows: async (req, res) => {
    if (req.user.id !== req.params.id) {
      try {
        const users = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);
        if (users.followers.includes(req.user.id)) {
          await users.updateOne({ $pull: { followers: req.user.id } });
          await currentUser.updateOne({ $pull: { following: req.params.id } });

          req.flash(
            "unfollow",
            `You unfollowed ${users.userName.toUpperCase()}`
          );
          res.redirect("/users");
          // res.status(200).json("user has been unfollowed");
        } else {
          req.flash(
            "notFollowing",
            `You don't follow ${users.userName.toUpperCase()}`
          );
          res.redirect("/users");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      req.flash("unfollowYourself", "You cannot unfollow yourself!");
      res.redirect("/users");
    }
  },
};
