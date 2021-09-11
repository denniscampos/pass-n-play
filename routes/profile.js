const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// router.get("/", profileController.getProfile); // is this needed?
// router.put("/updateSocials/:id", ensureAuth, profileController.updateSocials);

module.exports = router;
