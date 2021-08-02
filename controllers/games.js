const Game = require("../models/Game");
const Profile = require("../models/Profile");
const User = require("../models/User");
const moment = require("moment");

module.exports = {
  getGames: async (req, res) => {
    try {
      const games = await Game.find({ user: req.user.id });

      res.render("mylists", {
        games: games,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
