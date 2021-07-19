const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { ensureAuth } = require("../middleware/auth");

router.get("/user", ensureAuth, userController.getUsers);

// follow, unfollow for profile
router.put("/followers/:id", ensureAuth, userController.getFollowers);

module.exports = router;
