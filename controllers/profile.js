const Profile = require("../models/Profile");
const Post = require("../models/Post");
const User = require("../models/User");
const Game = require("../models/Game");
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

  createGame: async (req, res) => {
    const gameAPI = axios(
      `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&metacritic=95,100&ordering=-rating&page_size=8`
    );

    const games = gameAPI.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
      };
    });

    await Game.create({
      games: games,
    });

    console.log(games);

    res.redirect("/profile");
    console.log("addded game name to database.");
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
      platforms.instagram = req.body.youtube;
      platforms.url = req.body.url;
      await platforms.save();

      // await Profile.findOneAndUpdate(
      //   { user: req.params.id },
      //   {
      //     twitter: req.body.twitter,
      //     twitch: req.body.twitch,
      //     discord: req.body.discord,
      //     instagram: req.body.instagram,
      //   }
      // );
      //lean converts to object
      const profile = await Profile.find({ user: req.params.id });

      res.redirect("/profile");
      console.log("update successful");
    } catch (err) {
      console.log(err);
    }
  },
};
