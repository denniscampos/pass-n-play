const mongoose = require("mongoose");

const EditSchema = new mongoose.Schema({
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
    required: false,
  },
  discord: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Edit", EditSchema);
