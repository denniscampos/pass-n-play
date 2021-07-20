const Profile = require("../models/Profile");
const Post = require("../models/Post");
const User = require("../models/User");
const moment = require("moment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const socials = await Profile.find({ user: req.user.id });
      const allPosts = await Post.find({ userId: req.user.id });
      const users = await User.find(req.userName);

      // console.log(users);

      res.render("profile", {
        users: users,
        user: req.user,
        userName: req.user.userName,
        email: req.user.email,
        posts: allPosts,
        socials: socials,
        moment: moment,
      });
      // console.log(socials);
    } catch (err) {
      console.log(err);
    }
  },

  createSocials: async (req, res) => {
    try {
      await Profile.create({
        user: req.user,
        twitter: req.body.twitter,
        twitch: req.body.twitch,
        discord: req.body.discord,
        instagram: req.body.instagram,
      });
      res.redirect("/profile");
      console.log("create succesful");
    } catch (err) {
      console.log(err);
    }
  },

  updateSocials: async (req, res) => {
    try {
      // console.log(`##REQUEST BODY##: ${JSON.stringify(req.body)}`);
      // const socials = await Profile.find({_id: id})
      // socials.twitter = 'newTwitterID'
      // await socials.save()

      // const query = { userName: 'dnbull' };
      // Model.findOneAndUpdate({ name: 'borne' }, { name: 'jason bourne' })

      //Profile
      // {
      //   _id: ObjectId,
      //   userName: "dnbull"
      //   "name": "first last",
      //   "twitter": "blah",
      //   "insta": "blah",
      //   "steam": "blah"
      // }
      //Post
      //mongoose -- make me a new socials object and save it to the DB
      //Edit
      //mongoose -- find me a document that matches my needs and change some props

      // console.log(`~!~!~THIS IS MY REQUEST: ${req.params.id}`); // ~!~!~THIS IS MY REQUEST: 609d9db0cffbce09002eae4d
      // console.log(`~!~!~THIS IS MY ID: ${req.user.id}`); // req.id = undefined and req.user.id = 609d9db0cffbce09002eae4d
      await Profile.findOneAndUpdate(
        { user: req.params.id },
        {
          twitter: req.body.twitter,
          twitch: req.body.twitch,
          discord: req.body.discord,
          instagram: req.body.instagram,
        }
      );
      //lean converts to object
      const profile = await Profile.find({ user: req.params.id });

      res.redirect("/profile");
      console.log("update successful");
    } catch (err) {
      console.log(err);
    }
  },

  // getFollowers: async (req, res) => {
  //   try {
  //     const users = await User.find(req.userName);
  //     console.log("followed user");
  //     // console.log(users);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  // delete things below if things break.
  // test: async (req, res) => {
  //   try {
  //     const profile = await Profile.findOne();
  //     res.render("create", {
  //       user: req.user,
  //       profile: profile,
  //       // twitter: "",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
