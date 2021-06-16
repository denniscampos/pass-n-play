const axios = require("axios").default;
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const moment = require("moment");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getHomepage: async (req, res, next) => {
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&metacritic=95,100&ordering=-rating`
      );

      // finds user and can be rendered on EJS.
      // const users = await Post.find({ user: req.user.id });

      const games = gameAPI.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          img: game.background_image,
          released: game.released,
          platforms:
            game.platforms === null
              ? "Platform Not Found"
              : game.platforms
                  .map((platform) => platform.platform.name)
                  .join(", "),
        };
      });

      // console.log(games);

      const socials = await Profile.find({ user: req.user.id });
      const allPosts = await Post.find();

      res.render("homepage", {
        games: games,
        user: req.user,
        posts: allPosts,
        socials: socials,
        moment: moment,
      });
      // console.log(socials);
      // console.log(gameAPI.data.results[0].name);
    } catch (next) {
      console.log(next);
    }
  },

  getResults: async (req, res) => {
    let searchId = req.params.id;
    // console.log(searchId);
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games/${searchId}?key=${process.env.API_GAME_KEY}`
      );

      const socials = await Profile.find({ user: req.user.id });
      const allPosts = await Post.find({ user: req.user.id });
      const games = gameAPI.data;

      res.render("results", {
        games: games,
        userName: req.user.userName,
        email: req.user.email,
        posts: allPosts,
        user: req.user,
        socials: socials,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getSearch: async (req, res) => {
    let search = req.body.search;
    // console.log(search);
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&search=${search}`
      );

      const games = gameAPI.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          platforms:
            game.platforms === null
              ? "Platform Not Found"
              : game.platforms
                  .map((platform) => platform.platform.name)
                  .join(", "),
        };
      });
      const socials = await Profile.find({ user: req.user.id });
      const allPosts = await Post.find({ user: req.user.id });
      res.render("search", {
        games: games,
        userName: req.user.userName,
        email: req.user.email,
        posts: allPosts,
        user: req.user,
        socials: socials,
      });

      // old version
      // res.render("search", { games: gameAPI.data });
    } catch (err) {
      console.log(err);
    }
  },

  getPopular: async (req, res) => {
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&ordering=-rating&dates=2020-01-01,2020-12-31&metacritic=80,100`
      );
      const socials = await Profile.find({ user: req.user.id });
      const games = await gameAPI.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          img: game.background_image,
          released: game.released,
          rating: game.rating,
          platforms:
            game.platforms === null
              ? "Platform Not Found"
              : game.platforms
                  .map((platform) => platform.platform.name)
                  .join(", "),
        };
      });

      const test = {
        pc: "PC",
        ns: "Nintendo Switch",
      };

      console.log(test); // this is doubling but even if i console log anything else it doubles.

      res.render("popular", {
        games: games,
        test: test,
        userName: req.user.userName,
        email: req.user.email,
        user: req.user,
        socials: socials,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
