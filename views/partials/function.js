const axios = require("axios");

function math(a, b) {
  return a + b;
}

async function addToFavorites(id, title, imgUrl) {
  return await axios.post("/mylists/", { id, title, imgUrl });
}

module.exports = {
  math: math,
  addToFavorites: addToFavorites,
};
