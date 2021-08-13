const axios = require("axios").default;
const Game = require("../models/Game");
const Profile = require("../models/Profile");
const User = require("../models/User");
const moment = require("moment");

module.exports = {
  getGames: async (req, res) => {
    try {
      let gameList = await Game.find({ id: req.id });
      console.log(gameList);
      const loop = gameList.map((game) => game.gameList);
      console.log(loop);

      // router.put("/:id/update", (req, res) => {
      //   let updates = req.body //we set a variable equal to the entire req.body
      //   Puppy.findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
      //     .then(updatedPuppy => res.json(updatedPuppy))
      //     .catch(err => res.status(400).json("Error: " + err))
      // })

      res.render("mylists", {
        // game: game, // game id
        // game_title: game_title,
        // games: games,
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
      games.gameList.push({ game: gameId, title: title, image: imgUrl });
      await games.save().then(() => {
        res.status(200).redirect("/homepage");
      });
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  },
};

//save the id to our database

// in our wishlist page, we can populate the data.
