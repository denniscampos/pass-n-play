const axios = require("axios");
const { request } = require("express");

module.exports = {
  discover: async (req, res) => {
    try {
      let gameUrl = `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&page=1&page_size=5`;
      let games = await axios.get(gameUrl);

      // next page
      gameUrl = games.data.next;
      let newUrl = await axios.get(gameUrl);
      let testMe = newUrl.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.background_image,
        };
      });

      const gameInfo = {
        games: games.data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            image: game.background_image,
          };
        }),
        links: {
          next: games.data.next,
          prev: games.data.prev,
        },
      };

      res.render("discover", {
        gameInfo: gameInfo,
        query: req.query,
        testMe: testMe,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
