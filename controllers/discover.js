const axios = require("axios");

module.exports = {
  discover: async (req, res) => {
    try {
      let gameUrl = `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&page=1`;
      const games = await axios.get(gameUrl);

      const url = new URL(gameUrl);
      const page = url.searchParams.get("page");
      console.log(page);

      const gameInfo = games.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.background_image,
        };
      });

      res.render("discover", {
        gameInfo: gameInfo,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
