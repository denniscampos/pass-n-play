const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", profileController.getProfile); // is this needed?
router.post("/createSocials/", profileController.createSocials);
router.put("/updateSocials/:id", profileController.updateSocials);

//delete below if things stop working.

// router.get("/", profileController.test);

module.exports = router;
