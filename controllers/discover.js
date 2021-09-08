const axios = require("axios");

module.exports = {
  discover: async (req, res) => {
    try {
      const games = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&page=1&page_size=20`
      );

      const next = games.data.next;
      const previous = games.data.previous;

      //   const test = await axios.get(next);
      //   console.log(test.data.next);

      const gameInfo = games.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.background_image,
        };
      });

      res.render("discover", {
        gameInfo: gameInfo,
        next: next,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
