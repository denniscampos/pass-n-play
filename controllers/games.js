const axios = require("axios").default;
const Game = require("../models/Game");
const Profile = require("../models/Profile");
const User = require("../models/User");
const moment = require("moment");

module.exports = {
  getGames: async (req, res) => {
    const { id: searchId } = req.params;
    try {
      // API
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games/${searchId}?key=${process.env.API_GAME_KEY}`
      );

      const game = gameAPI.data.id;
      const game_title = gameAPI.data.name;

      const users = await User.find(req.userName);
      const games = await Game.find({ user: req.user.id });

      res.render("mylists", {
        game: game, // game id
        game_title: game_title,
        games: games,
        users: users,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
