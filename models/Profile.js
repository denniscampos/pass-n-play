const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    twitch: {
      type: String,
      default: "",
    },
    discord: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
