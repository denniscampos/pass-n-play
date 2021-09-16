const express = require("express");
const router = express.Router();
const myListRoutes = require("./mylists");
const authRoutes = require("./auth");

router.use("/mylists", myListsRoutes);
router.use("/auth", authRoutes);

module.exports = router;
