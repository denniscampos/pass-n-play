const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", profileController.getProfile);
router.post("/createSocials/", profileController.createSocials);
router.put("/updateSocials/:id", profileController.updateSocials);

module.exports = router;
