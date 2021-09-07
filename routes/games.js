const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games");
const { ensureAuth } = require("../middleware/auth");

// MyLists
router.post("/mylists/:id", gameController.addWishList);
// router.get("/mylists/", gameController.getGames);
// router.put("/mylists/:id", ensureAuth, gameController.getGames);

module.exports = router;
