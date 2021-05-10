const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");

//main routes
router.get("/", homeController.getIndex);
router.get("/login", authController.getLogin);

module.exports = router;
