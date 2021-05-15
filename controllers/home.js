const axios = require("axios").default;

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getHomepage: async (req, res) => {
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games?key=159068bc72d44ffd8bf6ea56ae06e8a2`
      );

      res.render("homepage", { games: gameAPI.data.results });
      // console.log(gameAPI.data.results[0].name);
    } catch (error) {
      console.error(error);
    }
  },
};

// getHomepage: async (req, res) => {
//   try {
//     const URL = `https://api.rawg.io/api/games?key=159068bc72d44ffd8bf6ea56ae06e8a2`;
//     const rest = await fetch(URL);
//     const data = await rest.json();
//     res.render("homepage", { data: data });
//   } catch (error) {
//     console.error(error);
//   }
// },
