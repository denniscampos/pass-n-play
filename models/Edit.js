const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "User",
  },
  twitch: {
    type: String,
    required: true,
  },
  discord: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Edit", PostSchema);
