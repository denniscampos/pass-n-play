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
      const allPosts = await Post.find();
      res.render("homepage", {
        games: gameAPI.data.results,
        user: req.user,
        posts: allPosts,
      });
      // console.log(gameAPI.data.results[0].name);
    } catch (error) {
      console.log(error);
    }
  },

  getSearch: async (req, res) => {
    let search = req.body.search;
    console.log(search);
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&search=${search}`
      );

      const games = gameAPI.data.results.map((game) => {
        return {
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

      res.render("search", { games: games });

      // old version
      // res.render("search", { games: gameAPI.data });
    } catch (error) {
      console.log(error);
    }
  },
};
