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

      // console.log(req.body.twitter);
      res.redirect("/editProfile");
    } catch (err) {
      console.log(err);
    }
  },

  edit: async (req, res) => {
    try {
      const edits = await Edit.findById(req.params.id);
      res.render("edit", {
        edits: edits,
      });
      console.log(edits);
      console.log(req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  // update: async (req, res) => {
  //   try {
  //     userParams = {
  //       socials: {
  //         twitter: req.body.twitter,
  //       },
  //     };

  //     const edit = await Edit.findByIdAndUpdate(
  //       { userId: req.user.id },
  //       {
  //         $set: userParams,
  //       }
  //     );
  //     res.locals.redirect(`editProfile/${edit}`);
  //     res.locals.user = user; // ???
  //     // console.log(res.locals);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
