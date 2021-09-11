const axios = require("axios");

module.exports = {
  discover: async (req, res) => {
    try {
      let gameUrl = `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&page=1&page_size=5`;
      const games = await axios.get(gameUrl);

      const nextPage = games.data.next;
      const nextUrl = await axios.get(nextPage);
      const nextData = nextUrl.data.results.map((game) => {
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

      if (req.url.includes("/discover/next")) {
        res.render("discover", {
          nextData: nextData,
        });
      } else {
        res.render("discover", {
          gameInfo: gameInfo,
          nextData: nextData,
        });
      }
      // res.render("discover", {
      //   gameInfo: gameInfo,
      // });
    } catch (err) {
      console.log(err);
    }
  },
};

// app.get("*", (req, res) => {
//   if (req.url.indexOf("todos") === -1) {
//     return res.render("index", { title: "index page" });
//   } else {
//     return res.render("todos", { title: "todos page" });
//   }
// });
