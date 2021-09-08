const axios = require("axios").default;
const Game = require("../models/Game");
const Profile = require("../models/Profile");
const User = require("../models/User");
const moment = require("moment");

module.exports = {
  getGames: async (req, res) => {
    try {
      let gameList = await Game.find();

      const gameInfo = gameList.map((game) => {
        return {
          user: game.user,
          gameList: game.gameList,
        };
      });

      res.render("mylists", {
        gameList: gameList,
        user: req.user,
        gameInfo: gameInfo,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json();
    }
  },

  addWishList: async (req, res) => {
    let gameId = req.params.id;
    const { title, imgUrl } = req.query;
    try {
      let games = await Game.findOne({ user: req.user });

      if (!games) {
        games = new Game({
          user: req.user,
          gameList: [],
        });
      }
      //game title
      if (!games.gameList.find((game) => game.game === gameId)) {
        games.gameList.push({
          game: gameId,
          title: title,
          image: imgUrl,
        });

        await games.save();
        res.status(200).redirect("/homepage");

        //display message that game was successfully added to your wishlist
      } else {
        // display message that game was exist in your library
        res.redirect("/homepage");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  deleteGame: async (req, res) => {
    try {
      await Game.findOneAndUpdate(
        { user: req.user },
        { $pull: { gameList: { game: req.params.id } } }
      );
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
};
