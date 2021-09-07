const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const profileController = require("../controllers/profile");
const usersController = require("../controllers/user");
const gameController = require("../controllers/games");
const editController = require("../controllers/edit");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//main routes
router.get("/", ensureGuest, homeController.getIndex);
router.get("/homepage", homeController.getHomepage);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

// Edit Page
// router.get("/edit", editController.editProfile);

//  MyLists
router.get("/mylists/", ensureAuth, gameController.getGames);
router.post("/mylists/:id", ensureAuth, gameController.addWishList);
router.delete("/deleteGame/:id", ensureAuth, gameController.deleteGame);

// new comment
router.post("/createReview/:id", ensureAuth, homeController.createReviews);
router.put("/likeReview/:id", ensureAuth, homeController.likeReviews);
router.delete("/deleteReview/:id", ensureAuth, homeController.deleteReviews);

// Profile
router.get("/profile", profileController.getProfile);

// Users
router.get("/users", ensureAuth, usersController.getUsers);

// follow, unfollow for profile
router.put("/followers/:id", ensureAuth, usersController.getFollowers);
router.put("/unfollows/:id", ensureAuth, usersController.getUnfollows);

// Popular
router.get("/popular", homeController.getPopular);

// Search
router.get("/:id/", homeController.getResults);
router.post("/search", homeController.getSearch);

module.exports = router;
