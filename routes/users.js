const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { ensureAuth } = require("../middleware/auth");

router.get("/user", ensureAuth, userController.getUsers);

// follow, unfollow for profile

// the below is uncommented because im not sure if its being picked up here or in main.js
router.put("/followers/:id", ensureAuth, userController.getFollowers);
router.put("/unfollows/:id", ensureAuth, userController.getUnfollows);

module.exports = router;
