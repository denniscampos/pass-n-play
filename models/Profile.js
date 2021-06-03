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
  // platform_name: {
  //   type: String,
  //   required: false,
  //   default: "",
  // },
  // url: {
  //   type: String,
  //   required: false,
  //   default: "",
  // },
  // username: {
  //   type: String,
  //   required: false,
  //   default: "",
  // },
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
