const axios = require("axios").default;
const Edit = require("../models/Edit");

module.exports = {
  getEdit: async (req, res) => {
    try {
      const edit = await Edit.find({ userId: req.user.id });

      res.render("editProfile", {
        user: req.user,
        userName: req.user.userName,
        edits: edit,
        twitter: req.body.twitter,
      });
    } catch (err) {
      console.log(err);
    }
  },

  createSocials: async (req, res) => {
    try {
      await Edit.create({
        twitter: req.body.twitter,
        twitch: req.body.twitch,
        userId: req.user.id,
        userName: req.user.userName,
      });
      console.log(req.body.twitter);
      console.log("post was created");
      res.redirect("/editProfile");
    } catch (err) {
      console.log(err);
    }
  },

  edit: async (req, res) => {
    try {
      const edits = await Edit.findOne({ userId: req.user.id });
      res.render("edit", {
        edits: edits,
      });
      console.log(edits);
      // console.log(req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  update: async (req, res) => {
    let updates;
    try {
      updates = await Edit.findOneAndUpdate({ twitter: req.body.twitter });
      updates.twitter = req.body.twitter;
      await updates.save();
      // console.log(updates.twitter);
      console.log(req.body.twitter);
      console.log(req.user.id);
      res.redirect("/editprofile");
    } catch (err) {
      console.log(err);
    }
  },
};
