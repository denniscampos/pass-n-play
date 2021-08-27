const axios = require("axios").default;
const Game = require("../models/Game");
const Profile = require("../models/Profile");
const User = require("../models/User");
const moment = require("moment");

module.exports = {
  getGames: async (req, res) => {
    try {
      let gameList = await Game.find({ id: req.id });

      // const gameInfo = gameList.map((item) =>
      //   item.gameList.map((game) => game.title)
      // );
      // console.log(gameInfo);

      const gameInfo = gameList.map((item) =>
        item.gameList.map((game) => {
          return {
            gameId: game.game,
            gameTitle: game.title,
            gameImage: game.image,
          };
        })
      );

      res.render("mylists", {
        gameInfo: gameInfo,
        // users: users,
      });
    } catch (err) {
      console.log(err);
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
      const gameTitle = games.gameList.map((game) => game.game);

      if (!gameTitle.includes(gameId)) {
        games.gameList.push({ game: gameId, title: title, image: imgUrl });
        res.status(200).redirect("/homepage");
        await games.save().then(() => {});
        //display message that game was successfully added to your wishlist
      } else {
        // display message that game was exist in your library
        res.redirect("/homepage");
      }
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  },
};

//save the id to our database

// in our wishlist page, we can populate the data.
