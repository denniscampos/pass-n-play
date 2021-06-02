const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//main routes
router.get("/", ensureGuest, homeController.getIndex);
router.get("/homepage", homeController.getHomepage);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

// Search
router.post("/search", homeController.getSearch);
router.post("/search/:id", homeController.getSearch);

// Profile
router.get("/profile", profileController.getProfile);
router.get("/create", profileController.test);

module.exports = router;
