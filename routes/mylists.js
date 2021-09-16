const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games");
const { ensureAuth } = require("../middleware/auth");

// put method
// router.put("/mylists/:id", ensureAuth)

module.exports = router;
