const axios = require("axios");
const { request } = require("express");
const _ = require("lodash");

module.exports = {
  discover: async (req, res) => {
    try {
      let page = _.get(req, "query.page", 1);
      let gameUrl = `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&page=${page}&page_size=15`;
      let games = await axios.get(gameUrl);

      const gameInfo = {
        games: games.data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            image: game.background_image,
          };
        }),
        page: _.get(req, "query.page", 1),
      };

      res.render("discover", {
        gameInfo: gameInfo,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
