const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games");
const { ensureAuth } = require("../middleware/auth");

module.exports = router;
