const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");

//main routes
router.get("/", homeController.getIndex);

module.exports = router;
