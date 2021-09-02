const axios = require("axios").default;
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const Comment = require("../models/Comment");
const moment = require("moment");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getHomepage: async (req, res) => {
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&metacritic=95,100&ordering=-rating&page_size=8`
      );

      const gameTrending = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&metacritic=80,100&ordering=-rating&page_size=8&dates=2020-01-01,2021-12-31`
      );

      const trends = gameTrending.data.results.map((trending) => {
        return {
          id: trending.id,
          name: trending.name,
          img: trending.background_image,
          released: trending.released,
          platforms:
            trending.platforms === null
              ? "Platform Not Found"
              : trending.platforms
                  .map((platform) => platform.platform.name)
                  .join(", "),
        };
      });

      const games = gameAPI.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          img: game.background_image,
          released: game.released,
          platforms:
            game.platforms === null
              ? "Platform Not Found"
              : game.platforms
                  .map((platform) => platform.platform.name)
                  .join(", "),
        };
      });

      const socials = await Profile.find({ user: req.user.id });
      const allPosts = await Post.find();
      const helper = require("../views/partials/function");

      res.render("homepage", {
        games: games,
        trends: trends,
        user: req.user,
        posts: allPosts,
        socials: socials,
        moment: moment,
        helper: helper,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getResults: async (req, res) => {
    let searchId = req.params.id;
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games/${searchId}?key=${process.env.API_GAME_KEY}`
      );

      const socials = await Profile.find({ user: req.user.id });
      const allPosts = await Post.find({ user: req.user.id });
      const games = await gameAPI.data;
      const gamePlatforms = await gameAPI.data.platforms
        .map((platform) => platform.platform.name)
        .join(", ");
      const gameGenre = await gameAPI.data.genres
        .map((genre) => genre.name)
        .join(", ");

      // const gameIds = await JSON.stringify(gameAPI.data.id).split(" ");
      const gameIds = gameAPI.data.id;

      const comments = await Comment.find({ game: { $in: gameIds } });

      // console.log(comments);

      res.render("results", {
        comments: comments,
        games: games,
        game_platforms: gamePlatforms,
        game_genres: gameGenre,
        userName: req.user.userName,
        email: req.user.email,
        posts: allPosts,
        user: req.user,
        socials: socials,
        moment: moment,
      });
    } catch (err) {
      console.log(err);
    }
  },

  createReviews: async (req, res) => {
    let searchId = req.params.id;
    const { id: reviewId } = req.params;
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games/${searchId}?key=${process.env.API_GAME_KEY}`
      );

      const game = gameAPI.data.id;
      const game_title = gameAPI.data.name;

      await Comment.create({
        //grabs game id
        game: game,
        game_title: game_title,
        userName: req.user.userName,
        comment: req.body.newComment,
        user: req.user.id,
      });

      res.redirect(`/${searchId}`);
    } catch (err) {
      console.log(err);
    }
  },

  likeReviews: async (req, res) => {
    const { id: reviewId } = req.params;
    // to redirect back to game after liking
    const likes = await Comment.findById(reviewId);
    try {
      const reviews = await Comment.findById(reviewId);
      if (!reviews.likes.includes(req.user.id)) {
        await reviews.updateOne({ $push: { likes: req.user.id } });
        console.log("user like status");
      } else {
        await reviews.updateOne({ $pull: { likes: req.user.id } });
        console.log("user unlike status");
      }
      res.redirect("back");
      // res.redirect(`/${likes.game}`);
    } catch (err) {
      console.log(err);
    }
  },

  deleteReviews: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.id });
      console.log("successfully deleted");
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },

  getSearch: async (req, res) => {
    let search = req.body.search;

    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&search=${search}`
      );

      const games = gameAPI.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          platforms:
            game.platforms === null
              ? "Platform Not Found"
              : game.platforms
                  .map((platform) => platform.platform.name)
                  .join(", "),
        };
      });
      const socials = await Profile.find({ user: req.user.id });
      const allPosts = await Post.find({ user: req.user.id });
      res.render("search", {
        games: games,
        userName: req.user.userName,
        email: req.user.email,
        posts: allPosts,
        user: req.user,
        socials: socials,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getPopular: async (req, res) => {
    try {
      const gameAPI = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.API_GAME_KEY}&ordering=-rating&dates=2020-01-01,2020-12-31&metacritic=80,100`
      );
      const socials = await Profile.find({ user: req.user.id });
      const games = await gameAPI.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          img: game.background_image,
          released: game.released,
          rating: game.rating,
          platforms:
            game.platforms === null
              ? "Platform Not Found"
              : game.platforms
                  .map((platform) => platform.platform.name)
                  .join(", "),
        };
      });

      res.render("popular", {
        games: games,
        userName: req.user.userName,
        email: req.user.email,
        user: req.user,
        socials: socials,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
