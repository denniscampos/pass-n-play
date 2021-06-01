const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  twitch: {
    type: String,
    required: false,
    default: "",
  },
  discord: {
    type: String,
    required: false,
    default: "",
  },
  twitter: {
    type: String,
    required: false,
    default: "",
  },
  instagram: {
    type: String,
    required: false,
    default: "",
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
