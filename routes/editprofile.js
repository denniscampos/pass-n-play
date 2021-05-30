const express = require("express");
const router = express.Router();
const editController = require("../controllers/editprofile");
const { ensureAuth } = require("../middleware/auth");

// router.get("/editProfile", editController.getEdit);
// router.post("/createSocials/", editController.createSocials);
// router.get("/editProfile/edit", editController.edit);

module.exports = router;
