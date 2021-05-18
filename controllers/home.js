const axios = require("axios").default;
const Post = require("../models/Post");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getHomepage: async (req, res) => {
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}`
      );

      // finds user and can be rendered on EJS.
      const users = await Post.find({ user: req.user.id });
      res.render("homepage", { games: gameAPI.data.results, user: req.user });
      // console.log(gameAPI.data.results[0].name);
    } catch (error) {
      console.log(error);
    }
  },

  getSearch: async (req, res) => {
    let search = req.body.search;

    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games/${search}?key=${process.env.API_GAME_KEY}`
      );
      res.render("search", { games: gameAPI.data });
    } catch (error) {
      console.log(error);
    }
  },
};
