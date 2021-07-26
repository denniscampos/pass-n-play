const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const profileController = require("../controllers/profile");
const usersController = require("../controllers/user");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//main routes
router.get("/", ensureGuest, homeController.getIndex);
router.get("/homepage", homeController.getHomepage);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

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

// new comment
router.post("/:id", ensureAuth, homeController.createReviews);
router.put("/likeReviews/:id", ensureAuth, homeController.likeReviews);
router.delete("/deleteReviews/:id", ensureAuth, homeController.deleteReviews);

module.exports = router;
