const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const editController = require("../controllers/editProfile");
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

//Edit Profile
router.get("/editProfile", editController.getEdit);
router.post("/createSocials/", editController.createSocials);
router.get("/editProfile/edit/", editController.edit);

// router.put("/editProfile/update", editController.update);

// Profile Page NEED TO SET UP PROFILE
router.get("/profile", postsController.getProfile);

module.exports = router;
